import { throwError } from "../utils/errror.config.js";

export const validBodyRequest = (schema) => (req, res, next) => {
    try {
        const data = schema.parse(req.body)
        req.body = data
        next()
    } catch (error) {
        if (error.errors && Array.isArray(error.errors)) {
            const allMessages = error.errors.map((err) => `${err.path}: ${err.message}`).join(";")
            return throwError(400, "Invalid request")
        }
    }
}