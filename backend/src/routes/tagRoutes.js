import express from "express";
import { createTags, deleteTags, getTags, updateTags, updateTagsBatch, deleteTagsBatch} from "../controllers/tagController.js";

const router = express.Router();

router.get("/", getTags);
router.post("/", createTags);
router.put("/:id", updateTags);
router.delete("/:id", deleteTags);
router.patch("/batch", updateTagsBatch);
router.delete("/batch", deleteTagsBatch);

export default router;