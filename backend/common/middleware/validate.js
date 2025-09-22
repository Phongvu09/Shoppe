// ESM
export const validate = (schema) => (req, res, next) => {
  try {
    // Parse & sanitize body theo schema Zod/Joi (ở đây là Zod)
    req.body = schema.parse(req.body);
    return next();
  } catch (err) {
    // Chuẩn hoá lỗi trả về
    const errors = err?.errors?.map(e => ({
      field: e.path?.[0],
      message: e.message,
    })) || [{ message: err.message }];
    return res.status(400).json({ message: "Validation error", errors });
  }
};

