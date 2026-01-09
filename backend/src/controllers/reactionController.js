import { prisma } from "../config/prisma.js";
import { reactionPolicy } from "../config/reactionPolicy.js";

// Constants từ schema + policy (1 nguồn sự thật là policy)
const VALID_ENTITY_TYPES = Object.keys(reactionPolicy);
const VALID_REACTION_TYPES = ["UPVOTE", "LIKE", "HEART", "HAHA", "STAR"];

// Helper
const isValidUUID = (id) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

//
// ========================
// GET REACTION SUMMARY
// ========================
//
export const getReactionSummary = async (req, res) => {
  try {
    const { entityType, entityId } = req.query;
    const userId = req.user?.id;

    // Validation
    if (!entityType || !entityId) {
      return res.status(400).json({
        message: "entityType & entityId required",
      });
    }

    if (!VALID_ENTITY_TYPES.includes(entityType)) {
      return res.status(400).json({ message: "Invalid entityType" });
    }

    if (!isValidUUID(entityId)) {
      return res.status(400).json({ message: "Invalid entityId format" });
    }

    const policy = reactionPolicy[entityType];

    // Query song song
    const [grouped, myReaction] = await Promise.all([
      prisma.reaction.groupBy({
        by: ["type"],
        where: { entityType, entityId },
        _count: { type: true },
      }),
      userId
        ? prisma.reaction.findFirst({
            where: { userId, entityType, entityId },
            select: { type: true },
          })
        : Promise.resolve(null),
    ]);

    // Normalize counts cho FE
    const counts = {};
    for (const t of policy.allowedTypes) {
      counts[t] = 0;
    }
    for (const r of grouped) {
      counts[r.type] = r._count.type;
    }

    return res.json({
      counts,
      myReaction: myReaction?.type ?? null,
    });
  } catch (error) {
    console.error("getReactionSummary error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//
// ========================
// ADD REACTION
// ========================
//
export const addReaction = async (req, res) => {
  try {
    const { entityType, entityId, type } = req.body;
    const userId = req.user.id;

    // Validation
    if (!entityType || !entityId || !type) {
      return res.status(400).json({
        message: "entityType, entityId, and type are required",
      });
    }

    if (!VALID_ENTITY_TYPES.includes(entityType)) {
      return res.status(400).json({ message: "Invalid entityType" });
    }

    if (!VALID_REACTION_TYPES.includes(type)) {
      return res.status(400).json({ message: "Invalid reaction type" });
    }

    if (!isValidUUID(entityId)) {
      return res.status(400).json({ message: "Invalid entityId format" });
    }

    const policy = reactionPolicy[entityType];

    if (!policy.allowedTypes.includes(type)) {
      return res.status(400).json({
        message: `Reaction type ${type} not allowed for ${entityType}`,
      });
    }

    // Check entity exists
    const modelMap = {
      POST: prisma.post,
      PROJECT: prisma.project,
      PHOTO: prisma.photo,
      COMMENT: prisma.comment,
    };

    const entity = await modelMap[entityType].findUnique({
      where: { id: entityId },
      select: { id: true },
    });

    if (!entity) {
      return res.status(404).json({ message: "Entity not found" });
    }

    // maxPerUser = 1 (COMMENT / POST / PHOTO)
    if (policy.maxPerUser === 1) {
      const existingSame = await prisma.reaction.findFirst({
        where: { userId, entityType, entityId, type },
      });

      // click lại cùng reaction → ignore (FE có thể gọi remove nếu muốn toggle)
      if (existingSame) {
        return res.status(200).json({ reacted: true });
      }

      // xóa reaction khác type
      await prisma.reaction.deleteMany({
        where: {
          userId,
          entityType,
          entityId,
          type: { not: type },
        },
      });
    }

    await prisma.reaction.create({
      data: { userId, entityType, entityId, type },
    });

    return res.json({ reacted: true });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Already reacted" });
    }

    console.error("addReaction error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//
// ========================
// REMOVE REACTION
// ========================
//
export const removeReaction = async (req, res) => {
  try {
    const { entityType, entityId, type } = req.body;
    const userId = req.user.id;

    // Validation
    if (!entityType || !entityId || !type) {
      return res.status(400).json({
        message: "entityType, entityId, and type are required",
      });
    }

    if (!VALID_ENTITY_TYPES.includes(entityType)) {
      return res.status(400).json({ message: "Invalid entityType" });
    }

    if (!VALID_REACTION_TYPES.includes(type)) {
      return res.status(400).json({ message: "Invalid reaction type" });
    }

    if (!isValidUUID(entityId)) {
      return res.status(400).json({ message: "Invalid entityId format" });
    }

    const result = await prisma.reaction.deleteMany({
      where: { userId, entityType, entityId, type },
    });

    return res.json({
      reacted: false,
      deleted: result.count > 0,
    });
  } catch (error) {
    console.error("removeReaction error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
