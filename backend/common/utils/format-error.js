// utils/format-error.js
export const formatError = (error) => {
    if (!error.errors) return "Invalid request";

    return error.errors
        .map((e) => {
            const path = e.path?.join(".") || "field";
            return `${path}: ${e.message}`;
        })
        .join("; ");
};
