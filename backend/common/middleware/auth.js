// backend/common/middleware/auth.js
import { verifyAccessToken } from "../utils/jwt.js";
import { createResponse } from "../configs/respone.config.js";
import { normalizeRoles } from "../utils/normalizeRoles.js";
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
    if (!decoded || !decoded.role) {
      return createResponse(res, 401, "Unauthorized: Token invalid or missing role");
    }
    req.user = decoded;
    return next();
  } catch (e) {
    return createResponse(res, 401, "Unauthorized: Invalid token");
  }
};


/** Chỉ cho phép các role truyền vào */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return createResponse(res, 401, "Unauthorized: Missing user or role in token");
    }

    const userRoles = normalizeRoles(req.user.role);
    const allowed = roles.some((r) => userRoles.includes(r.toUpperCase()));

    if (!allowed) {
      return createResponse(
        res,
        403,
        `Forbidden: Role ${userRoles.join(", ")} không được phép thực hiện`
      );
    }

    return next();
  };
};
export const requireAuth = authMiddleware;
export const requireRole = restrictTo;
