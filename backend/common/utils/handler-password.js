import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashed = await bcrypt.hash(password, salt);
        return hashed;
    } catch (err) {
        throw new Error("Không thể hash password: " + err.message);
    }
};

// So sánh password người dùng nhập với hash đã lưu trong DB
export const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (err) {
        throw new Error("Không thể so sánh password: " + err.message);
    }
};
