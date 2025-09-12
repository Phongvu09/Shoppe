export const createResponse = (res, code = 200, message, data) => {
    return res.status(code).send({
        message: message || "Successfully!",
        data,
    });
};