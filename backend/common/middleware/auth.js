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
// restrictTo.js
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    try {
      const userRoles = normalizeRoles(req.user?.role); // ["user","seller"]

      if (!userRoles.length) {
        console.error("❌ Lỗi: Không tìm thấy role trong token", req.user);
        return createResponse(res, 401, "Unauthorized: Missing user or role in token");
      }

      const allowedRoles = roles.map((r) =>
        typeof r === "string" ? r.toLowerCase() : String(r).toLowerCase()
      );

      console.log("🔍 Check roles:", { userRoles, allowedRoles });

      const allowed = allowedRoles.some((r) => userRoles.includes(r));

      if (!allowed) {
        console.error("❌ Lỗi phân quyền:", {
          tokenUser: req.user,
          userRoles,
          allowedRoles,
          message: `Role ${userRoles.join(", ")} không được phép`
        });
        return createResponse(
          res,
          403,
          `Forbidden: Role ${userRoles.join(", ")} không được phép thực hiện`
        );
      }

      next();
    } catch (err) {
      console.error("❌ Lỗi không xác định trong restrictTo:", err);
      return createResponse(res, 500, "Internal Server Error in restrictTo");
    }
  };
};



export const requireAuth = authMiddleware;
export const requireRole = restrictTo;
