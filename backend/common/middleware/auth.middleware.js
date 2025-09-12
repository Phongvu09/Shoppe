import { verifyToken } from "../utils/jwt.js";
import { createResponse } from "../configs/respone.config.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return createResponse(res, 401, "Unauthorized: No token provided");
    }


    const token = authHeader.split(" ")[1]
    try {
        const decoded = verifyToken(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch (error) {
        createResponse(res, 401, "Unauthorized: Invalid token")
    }
}

export const restrictTo = (...role) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return createResponse(res, 403, "Forbidden: You do not have permission to perform this action");
        }
        next();

    }
}