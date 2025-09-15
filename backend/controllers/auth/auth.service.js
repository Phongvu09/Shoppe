import User from "../../models/Users.js";
import { comparePassword, hashPassword } from "../../common/utils/handler-password.js";
import { throwError } from "../../common/utils/errror.config.js";
import MESSAGES from "./auth.message.js";
import { USER_ROLE } from "../../common/constant/enum.js";
import { generateToken } from "../../common/utils/jwt.js";
import { is } from "zod/locales";

export const autRegisterService = async (userData) => {
    const { username, email, password } = userData;

    // 1. Kiểm tra email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throwError(400, MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    // 2. Hash password
    const passwordHash = await hashPassword(password);

    // 3. Tạo user (đủ field username + email + password + role)
    const newUser = await User.create({
        username,
        email,
        password: passwordHash,
        role: USER_ROLE, // dùng constant thay vì string tay
    });

    // 4. Ẩn password trước khi trả response
    newUser.password = undefined;
    return newUser;
};

export const authLoginService = async (userData) => {
    const { email, password } = userData;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throwError(400, MESSAGES.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await comparePassword(password, existingUser.password);
    if (!isPasswordValid) {
        throwError(400, MESSAGES.INVALID_CREDENTIALS);
    }

    // ✅ Tạo accessToken
    const accessToken = generateToken(
        { id: existingUser._id.toString(), role: existingUser.role },
        process.env.JWT_SECRET,
        "7d"
    );

    existingUser.password = undefined;

    return { user: existingUser, accessToken };
};

export const checkHaveSellerRoleService = async (email) => {
    const user = await User.findOne({ email });
    if (user && user.role === USER_ROLE.SELLER) {
        return true;
    }
    return false;
};

export const loginSellerService = async (userData) => {
    const { email, password } = userData;

    // Kiểm tra email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throwError(400, MESSAGES.INVALID_CREDENTIALS);
    }

    // Kiểm tra password
    const isPasswordValid = await comparePassword(password, existingUser.password);
    if (!isPasswordValid) {
        throwError(400, MESSAGES.INVALID_CREDENTIALS);
    }


    // Kiểm tra xem có phải seller không
    const isSeller = await checkHaveSellerRoleService(email);
    if (isSeller === false) {
        await autRegisterService(userData);
    }

    // Tạo accessToken
    const accessToken = generateToken(
        { id: existingUser._id.toString(), role: existingUser.role },
        process.env.JWT_SECRET,
        "7d"
    );
    existingUser.password = undefined;

    return { user: existingUser, accessToken };
}
