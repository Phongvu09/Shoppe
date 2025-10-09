// ✅ Middleware xác thực & phân quyền (ESM)
import jwt from "jsonwebtoken";
import Users from "../../models/Users.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { createResponse } from "../configs/respone.config.js";
import { normalizeRoles } from "../utils/normalizeRoles.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

/** Lấy token từ header Authorization: Bearer <token> */
function getTokenFromHeader(req) {
  const { authorization } = req.headers || {};
  if (!authorization) return null;
  const [scheme, token] = authorization.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;
  return token.trim();
}

/** Middleware xác thực người dùng */
export async function requireAuth(req, res, next) {
  try {
    const token = getTokenFromHeader(req);
    if (!token) return createResponse(res, 401, "Unauthorized: Missing token");

    // Ưu tiên verify bằng utils nếu có
    let decoded;
    try {
      decoded = verifyAccessToken ? verifyAccessToken(token) : jwt.verify(token, JWT_SECRET);
    } catch {
      decoded = jwt.verify(token, JWT_SECRET);
    }

    if (!decoded?.id) {
      return createResponse(res, 401, "Unauthorized: Invalid token payload");
    }

    const user = await Users.findById(decoded.id).select("-password");
    if (!user) return createResponse(res, 401, "Unauthorized: User not found");

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return createResponse(res, 401, "Unauthorized: Invalid token");
  }
}

/** Middleware phân quyền theo role */
export const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return createResponse(res, 401, "Unauthorized: Missing user in token");
      }

      // Chuẩn hóa role (ví dụ: ['USER', 'SELLER'])
      const userRoles = normalizeRoles
        ? normalizeRoles(req.user.role)
        : [req.user.role?.toUpperCase()];

      // Kiểm tra role có nằm trong danh sách cho phép không
      const allowed = allowedRoles
        .map((r) => r.toLowerCase())
        .some((r) => userRoles.includes(r));

      console.log("🔍 Check roles:", { userRoles, allowedRoles });

      if (!allowed) {
        console.error("❌ Lỗi phân quyền:", {
          tokenUser: req.user,
          userRoles,
          allowedRoles,
          message: `Role ${userRoles.join(", ")} không được phép`,
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

// Alias để tương thích với code cũ
export const authMiddleware = requireAuth;
