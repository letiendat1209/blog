import express from "express";
import { authMiddleware, authOptional } from "../middlewares/index.js";
import {
  addReaction,
  removeReaction,
  getReactionSummary,
} from "../controllers/reactionController.js";

const router = express.Router();

router.get("/summary", authOptional, getReactionSummary);
router.post("/", authMiddleware, addReaction);
router.delete("/", authMiddleware, removeReaction);

export default router;
