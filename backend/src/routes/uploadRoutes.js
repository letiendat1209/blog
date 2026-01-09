// routes/upload.route.js
import express from "express";
import { uploadImage } from "../controllers/uploadController.js";
import { upload } from "../middlewares/upload.middleware.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
});

// router.post(
//   "/image",
//   upload.single("file"),
//   authMiddleware,
//   uploadLimiter,
//   uploadImage
// );
router.post(
  "/image",
  (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  },
  authMiddleware,
  uploadLimiter,
  uploadImage
);



export default router;
