// backend/common/utils/jwt.js
import jwt from "jsonwebtoken";

export const signAccessToken = (payload, expiresIn = "1h") => {
  if (!process.env.JWT_SECRET)
    throw new Error("JWT_SECRET not defined in .env");
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

export const verifyAccessToken = (token) => {
  if (!process.env.JWT_SECRET)
    throw new Error("JWT_SECRET not defined in .env");
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const signRefreshToken = (payload, expiresIn = "7d") => {
  if (!process.env.REFRESH_SECRET)
    throw new Error("REFRESH_SECRET not defined in .env");
  return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn });
};

export const verifyRefreshToken = (token) => {
  if (!process.env.REFRESH_SECRET)
    throw new Error("REFRESH_SECRET not defined in .env");
  return jwt.verify(token, process.env.REFRESH_SECRET);
};
