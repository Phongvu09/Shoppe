// ✅ Middleware xác thực & phân quyền (dùng cho ESM)
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
    // Lấy token
    const token = getTokenFromHeader(req);
    if (!token) return createResponse(res, 401, "Unauthorized: Missing token");

    // ✅ Ưu tiên verify bằng hàm utils (nếu có)
    let decoded = null;
    try {
      decoded = verifyAccessToken ? verifyAccessToken(token) : jwt.verify(token, JWT_SECRET);
    } catch {
      decoded = jwt.verify(token, JWT_SECRET);
    }

    // ✅ Nếu verify được thì gắn thông tin user
    let user = null;
    if (decoded?.id) {
      user = await Users.findById(decoded.id).select("-password");
      if (!user) return createResponse(res, 401, "Unauthorized: User not found");
    }

  req.user = user;
    return next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return createResponse(res, 401, "Unauthorized: Invalid token");
  }
}

/** Middleware phân quyền theo role */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return createResponse(res, 401, "Unauthorized: Missing user in token");

    const userRoles = normalizeRoles
      ? normalizeRoles(req.user.role)
      : [req.user.role?.toUpperCase()];

    const allowed = roles.some((r) => userRoles.includes(r.toUpperCase()));

    if (!allowed) {
      return createResponse(res, 403, `Forbidden: Role ${userRoles.join(", ")} không được phép`);
    }

    return next();
  };
};

// Alias cho code cũ nếu các file khác đã import
export const authMiddleware = requireAuth;
