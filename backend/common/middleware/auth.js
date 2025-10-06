<<<<<<< HEAD
// ✅ Middleware xác thực & phân quyền cho ESM
import jwt from "jsonwebtoken";
import Users from "../../models/Users.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
=======
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
>>>>>>> a380cd80723a24bd5d7207b7c85ca5cd9f7677c3

/** Lấy token từ header Authorization: Bearer <token> */
function getTokenFromHeader(req) {
  const { authorization } = req.headers || {};
  if (!authorization) return null;
  const [scheme, token] = authorization.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) return null;
  return token.trim();
}

/** Yêu cầu đăng nhập: verify token, gắn req.user */
export async function requireAuth(req, res, next) {
  try {
<<<<<<< HEAD
    const token = getTokenFromHeader(req);
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const payload = jwt.verify(token, JWT_SECRET); // { id: ... }
    const user = await Users.findById(payload.id).select("-password");
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
=======
    const decoded = verifyAccessToken(token);
    if (!decoded || !decoded.role) {
      return createResponse(res, 401, "Unauthorized: Token invalid or missing role");
    }
    req.user = decoded;
    return next();
  } catch (e) {
    return createResponse(res, 401, "Unauthorized: Invalid token");
>>>>>>> a380cd80723a24bd5d7207b7c85ca5cd9f7677c3
  }
}

<<<<<<< HEAD
/** Giới hạn theo role (nếu cần) */
export function restrictTo(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
=======

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
>>>>>>> a380cd80723a24bd5d7207b7c85ca5cd9f7677c3
