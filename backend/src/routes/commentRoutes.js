import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createComment,
  createGuestComment,
  deleteComment,
  getCommentsByEntity,
  getRepliesByComment,
  replyComment,
  updateComment,
} from "../controllers/commentController.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createCommentSchema,
  createGuestCommentSchema,
  createReplyCommentSchema,
} from "../validators/index.js";
import { guestCommentRateLimit } from "../middlewares/guestCommentRateLimit.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, validate(createCommentSchema), createComment);
// GUEST
router.post("/guest", guestCommentRateLimit, validate(createGuestCommentSchema), createGuestComment);
// READ
router.get("/", getCommentsByEntity);
router.get("/:id/replies", getRepliesByComment);
// USER ACTION
router.post("/:id/replies", authMiddleware, validate(createReplyCommentSchema), replyComment);
router.patch("/:id", authMiddleware, updateComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
