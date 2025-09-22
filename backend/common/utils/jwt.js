import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const {
  JWT_SECRET = "secret",
  JWT_EXPIRES = "1h",              // access token hết hạn nhanh
  REFRESH_SECRET = "refresh_secret",
  REFRESH_EXPIRES = "7d"           // refresh token lâu hơn
} = process.env;

/**
 * Access Token: dùng để xác thực cho mọi request API, hết hạn ngắn
 */
export const signAccessToken = (payload, expiresIn = JWT_EXPIRES) => {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined in environment variables");
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const verifyAccessToken = (token) => {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined in environment variables");
  return jwt.verify(token, JWT_SECRET);
};


export const signRefreshToken = (payload, expiresIn = REFRESH_EXPIRES) => {
  if (!REFRESH_SECRET) throw new Error("REFRESH_SECRET is not defined in environment variables");
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn });
};

export const verifyRefreshToken = (token) => {
  if (!REFRESH_SECRET) throw new Error("REFRESH_SECRET is not defined in environment variables");
  return jwt.verify(token, REFRESH_SECRET);
};
