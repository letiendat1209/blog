import { ZodError } from "zod";

export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      // Kiểm tra xem có thuộc tính errors không
      // cái khúc error này là name hoặc issue nhé dcm =)) , mò cả buổi
      if (error.name || error.errors) {
        const errors = (error.issues || error.errors).map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          message: "Dữ liệu không hợp lệ",
          errors,
        });
      }

      // Lỗi khác
      next(error);
    }
  };
};
