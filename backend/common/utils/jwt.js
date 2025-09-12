import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (payload, secret = JWT_SECRET, expiresIn = "7d") => {
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token, secret = JWT_SECRET) => {
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.verify(token, secret);
};
