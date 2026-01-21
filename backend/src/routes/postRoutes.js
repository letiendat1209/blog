import express from "express";
import { authMiddleware, authOptional, requireRole, validate } from "../middlewares/index.js";
import {
  createPost,
  updatePost,
  getPosts,
  publishPost,
  archivePost,
  getPost,
  trackPostView,
} from "../controllers/postController.js";
import { createPostSchema, updatePostSchema } from "../validators/index.js";

const router = express.Router();

//public
router.get("/", authOptional ,getPosts);
router.get("/:id", authOptional, getPost);
router.post("/:id/view", trackPostView);

//admin
router.post("/", authMiddleware, requireRole("ADMIN"), validate(createPostSchema), createPost);
router.put("/:id", authMiddleware, requireRole("ADMIN"), validate(updatePostSchema), updatePost);
router.post("/:id/publish", authMiddleware, requireRole("ADMIN"), publishPost);
router.post("/:id/archive", authMiddleware, requireRole("ADMIN"), archivePost);


export default router;
