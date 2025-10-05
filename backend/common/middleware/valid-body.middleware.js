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
    try {
        console.log("Received req.body:", req.body); // Debug req.body
        console.log("Received req.files:", req.files); // Debug req.files
        console.log(req.user)

        const shopId = req.user?.id;
        console.log("Decoded shopId from token:", shopId); // Debug shopId

        if (!shopId) {
            return throwError(400, "shopId is required");
        }

        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errors = result.error?.errors || [];
            if (errors.length > 0) {
                const allErrors = errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("\n");
                console.log("Validation errors:", allErrors); // Log chi tiết lỗi
                return throwError(400, allErrors);
            } else {
                const errorDetails = result.error ? JSON.stringify(result.error.format(), null, 2) : "No error details available";
                console.log("Validation failed with details:", errorDetails); // Log chi tiết lỗi không cụ thể
                return throwError(400, `Validation failed with no specific errors. Details: ${errorDetails}`);
            }
        }

        req.body = result.data;
        req.files = req.files || [];
        req.body.shopId = shopId;
        next();
    } catch (error) {
        console.error("Validation error:", error); // Log chi tiết lỗi
        return throwError(400, "Invalid request due to unexpected error: " + error.message);
    }
};