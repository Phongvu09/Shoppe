// backend/common/middleware/auth.js
import { verifyAccessToken } from "../utils/jwt.js";
import { createResponse } from "../configs/respone.config.js";

/** Lấy token từ header */
const extractToken = (req) => {
  const auth = req.headers.authorization || "";
  if (auth.startsWith("Bearer ")) return auth.slice(7);
  // fallback: hỗ trợ header khác nếu cần
  return req.headers["x-access-token"] || null;
};

/** Yêu cầu có token hợp lệ (Authorization: Bearer <token>) */
export const authMiddleware = (req, res, next) => {
  const token = extractToken(req);
  if (!token) return createResponse(res, 401, "Unauthorized: No token provided");

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded; // { id, role, ... }
    return next();
  } catch (e) {
    return createResponse(res, 401, "Unauthorized: Invalid token");
  }
};

/** Chỉ cho phép các role truyền vào */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles trong token có thể là string hoặc array
    const userRoles = Array.isArray(req.user?.role)
      ? req.user.role
      : [req.user?.role].filter(Boolean);

    const allowed = roles.some((r) => userRoles.includes(r));
    if (!allowed) {
      return createResponse(
        res,
        403,
        "Forbidden: You do not have permission to perform this action"
      );
    }
    return next();
  };
};

export const requireAuth = authMiddleware;
export const requireRole = restrictTo;
