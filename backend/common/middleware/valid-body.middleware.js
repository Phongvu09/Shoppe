import { throwError } from "../utils/errror.config.js";

export const validBodyRequest = (schema) => (req, res, next) => {
    try {
        const data = schema.parse(req.body);
        req.body = data;
        next();
    } catch (error) {
        if (error.errors && Array.isArray(error.errors)) {
            const allMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join(";");
            return throwError(400, allMessages || "Invalid request");
        }
        return throwError(400, "Invalid request");
    }
};

export const validBodyWithFiles = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return throwError(400, result.error.errors.map(e => `${e.path.join(".")}: ${e.message}`).join("; "));
    }

    // ✅ Kiểm tra file ở đây
    if (!req.files || req.files.length === 0) {
        return throwError(400, "At least one image is required");
    }

    req.body = result.data;
    next();
};
