// ✅ Middleware xác thực & phân quyền cho ESM
import jwt from "jsonwebtoken";
import Users from "../../models/Users.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

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
    const token = getTokenFromHeader(req);
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const payload = jwt.verify(token, JWT_SECRET); // { id: ... }
    const user = await Users.findById(payload.id).select("-password");
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

/** Giới hạn theo role (nếu cần) */
export function restrictTo(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
