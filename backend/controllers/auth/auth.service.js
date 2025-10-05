import User from "../../models/Users.js";
import bcrypt from "bcryptjs";
import { USER_ROLE } from "../../common/constant/enum.js";
import { signAccessToken } from "../../common/utils/jwt.js";

// ========== Đăng ký ==========
export const autRegisterService = async ({ username, email, password }) => {
  const existed = await User.findOne({ email });
  if (existed) return null;

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hash,
    role: [USER_ROLE.USER],
  });

  user.password = undefined;
  return user;
};

// ========== Đăng nhập ==========
export const authLoginService = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) return { user: null, accessToken: null };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { user: null, accessToken: null };

  const accessToken = signAccessToken({
    id: user._id.toString(),
    role: user.role,
  });

  user.password = undefined;
  return { user, accessToken };
};

// ========== Check role Seller ==========
export const checkHaveSellerRoleService = async (email) => {
  const user = await User.findOne({ email });
  return user && user.role.includes(USER_ROLE.SELLER);
};

// ========== Đăng nhập Seller ==========
export const loginSellerService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) return { user: null, accessToken: null };

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return { user: null, accessToken: null };

  if (!user.role.includes(USER_ROLE.SELLER)) {
    user.role.push(USER_ROLE.SELLER);
    await user.save();
  }

  const accessToken = signAccessToken({
    id: user._id.toString(),
    role: user.role,
  });

  user.password = undefined;
  return { user, accessToken };
};
