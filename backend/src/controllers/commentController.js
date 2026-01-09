import { prisma } from "../config/prisma.js";
import { v4 as uuidv4 } from "uuid";

export const createComment = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = req.user.id;
    const { content, entityId, entityType } = req.body;

    if (!content || !entityId || !entityType) {
      return res.status(400).json({ message: "Thiếu dữ liệu" });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        userId,
        entityId,
        entityType,
      },
      include: {
        user: {
          select: { id: true, name: true, avatarUrl: true },
        },
      },
    });

    res.status(201).json({
      data: comment,
    });
  } catch (err) {
    console.error("Create comment error:", err);
    res.status(500).json({ message: "Create comment failed" });
  }
};

export const createGuestComment = async (req, res) => {
  try {
    if (req.user) {
      return res.status(403).json({
        message: "User đã đăng nhập không được comment dưới dạng guest",
      });
    }
    let { content, entityId, entityType, displayName, parentId } = req.body;

    // Validate input
    content = content?.trim();
    displayName = displayName?.trim();

    if (!content || !entityId || !entityType || !displayName) {
      return res.status(400).json({ message: "Thiếu dữ liệu" });
    }

    if (content.length > 1000) {
      return res.status(400).json({ message: "Nội dung quá dài" });
    }

    if (displayName.length > 50) {
      return res.status(400).json({ message: "Tên hiển thị quá dài" });
    }

    // Lấy / tạo guestId
    let guestId = req.cookies?.guest_id;

    if (!guestId) {
      guestId = uuidv4();
      res.cookie("guest_id", guestId, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 ngày
      });
    }

    // Chống spam nội dung trùng
    const duplicated = await prisma.comment.findFirst({
      where: {
        guestId,
        content,
        createdAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000), // 5 phút
        },
      },
    });

    if (duplicated) {
      return res.status(400).json({
        message: "Bạn đang gửi nội dung trùng lặp",
      });
    }

    // Chặn link với guest
    const urlRegex = /(https?:\/\/|www\.)/i;

    if (urlRegex.test(content)) {
      return res.status(400).json({
        message: "Guest không được gửi link",
      });
    }

    // Xử lý reply
    let replyToUserId = null;
    let finalParentId = null;

    if (parentId) {
      const parent = await prisma.comment.findUnique({
        where: { id: parentId },
        select: {
          id: true,
          parentId: true,
          userId: true,
        },
      });

      if (!parent) {
        return res.status(404).json({ message: "Comment không tồn tại" });
      }

      // Luôn reply vào root comment
      finalParentId = parent.parentId ?? parent.id;
      replyToUserId = parent.userId;
    }

    // Tạo comment
    const comment = await prisma.comment.create({
      data: {
        content,
        entityId,
        entityType,
        displayName,
        guestId,
        parentId: finalParentId,
        replyToUserId,
      },
    });

    res.status(201).json({
      data: comment,
    });
  } catch (err) {
    console.error("Create guest comment error:", err);
    return res.status(500).json({ message: "Create guest comment failed" });
  }
};

export const getCommentsByEntity = async (req, res) => {
  try {
    const { entityType, entityId, page = 1, limit = 10 } = req.query;

    if (!entityType || !entityId) {
      return res
        .status(400)
        .json({ message: "Thiếu entityType hoặc entityId" });
    }

    // 1️⃣ Lấy TẤT CẢ comments của entity này
    const allComments = await prisma.comment.findMany({
      where: {
        entityType,
        entityId,
      },
      orderBy: { createdAt: "asc" },
      include: {
        user: {
          select: { id: true, name: true, avatarUrl: true },
        },
        replyToUser: {
          select: { id: true, name: true },
        },
        parent: {
          select: {
            id: true,
            isDeleted: true,
            user: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    // 2️⃣ Tách root comments vs replies
    const rootComments = allComments
      .filter((c) => c.parentId === null)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // desc

    const repliesMap = new Map();
    allComments
      .filter((c) => c.parentId !== null)
      .forEach((reply) => {
        // Tìm root comment của reply này
        let rootId = reply.parentId;
        let current = allComments.find((c) => c.id === rootId);

        // Traverse lên để tìm root
        while (current && current.parentId !== null) {
          rootId = current.parentId;
          current = allComments.find((c) => c.id === rootId);
        }

        if (!repliesMap.has(rootId)) {
          repliesMap.set(rootId, []);
        }
        repliesMap.get(rootId).push(reply);
      });

    // 3️⃣ Sanitize logic
    const sanitizeSelf = (comment) => {
      if (!comment.isDeleted) return comment;

      return {
        ...comment,
        userId: null,
        user: null,
        replyToUserId: null,
        replyToUser: null,
        displayName: null,
      };
    };

    // 4️⃣ Paginate root comments
    const paginatedRoots = rootComments.slice(
      (Number(page) - 1) * Number(limit),
      Number(page) * Number(limit)
    );

    // 5️⃣ Kết hợp root + replies
    const sanitizedComments = paginatedRoots.map((root) => {
      const replies = repliesMap.get(root.id) || [];

      return {
        ...sanitizeSelf(root),
        replies: replies.map((reply) => {
          const parentDeleted = reply.parent?.isDeleted;

          if (parentDeleted) {
            return {
              ...sanitizeSelf(reply),
              replyToUserId: null,
              replyToUser: null,
              replyToGuestName: null,
            };
          }

          return sanitizeSelf(reply);
        }),
      };
    });

    res.json({
      data: sanitizedComments,
      meta: {
        total: rootComments.length,
      },
    });
  } catch (err) {
    console.error("Get comments error:", err);
    res.status(500).json({ message: "Get comments failed" });
  }
};

export const replyComment = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Bạn cần đăng nhập để reply" });
    }

    const { id } = req.params; // id của comment được reply trực tiếp
    const { content } = req.body;
    const userId = req.user.id;

    const trimmed = content?.trim();
    if (!trimmed) {
      return res.status(400).json({ message: "Thiếu content" });
    }

    // 🔎 Tìm comment đang được reply
    const targetComment = await prisma.comment.findUnique({
      where: { id },
      select: {
        id: true,
        parentId: true,
        isDeleted: true,
        userId: true,
        displayName: true,
        entityId: true,
        entityType: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!targetComment) {
      return res.status(404).json({ message: "Comment không tồn tại" });
    }

    // 🎯 Người được reply (đúng comment trực tiếp)
    const replyToUser = targetComment.userId
      ? { connect: { id: targetComment.userId } }
      : undefined;

    const replyToGuestName = !targetComment.userId
      ? targetComment.displayName
      : null;

    // ✅ FIX QUAN TRỌNG:
    // parent = comment được reply trực tiếp
    const reply = await prisma.comment.create({
      data: {
        content: trimmed,
        user: {
          connect: { id: userId },
        },
        entityId: targetComment.entityId,
        entityType: targetComment.entityType,

        parent: {
          connect: { id: targetComment.id },
        },

        replyToUser,
        replyToGuestName,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        replyToUser: {
          select: {
            id: true,
            name: true,
          },
        },
        parent: {
          select: {
            id: true,
            isDeleted: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json({ data: reply });
  } catch (err) {
    console.error("Reply comment error:", err);
    res.status(500).json({ message: "Reply comment failed" });
  }
};

export const getRepliesByComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const replies = await prisma.comment.findMany({
      where: {
        parentId: id,
        // isDeleted: false,
      },
      orderBy: { createdAt: "asc" },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      include: {
        user: {
          select: { id: true, name: true, avatarUrl: true },
        },
        replyToUser: {
          select: { id: true, name: true },
        },
      },
    });

    res.json(replies);
  } catch (err) {
    console.error("Get replies error:", err);
    res.status(500).json({ message: "Get replies failed" });
  }
};

export const updateComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Thiếu content" });
    }

    const comment = await prisma.comment.findUnique({ where: { id } });

    if (!comment) {
      return res.status(404).json({ message: "Comment không tồn tại" });
    }

    if (comment.userId !== userId) {
      return res.status(403).json({ message: "Không có quyền sửa" });
    }

    const updated = await prisma.comment.update({
      where: { id },
      data: { content },
    });

    res.json(updated);
  } catch (err) {
    console.error("Update comment error:", err);
    res.status(500).json({ message: "Update comment failed" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // 1️⃣ Lấy comment + đếm số replies
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: {
        _count: {
          select: { replies: true },
        },
      },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment không tồn tại" });
    }

    if (comment.userId !== userId) {
      return res.status(403).json({ message: "Không có quyền xoá" });
    }

    if (comment.isDeleted) {
      return res.status(400).json({ message: "Comment đã bị xóa trước đó" });
    }

    // 2️⃣ Check có reply không
    const hasReplies = comment._count.replies > 0;

    if (hasReplies) {
      // 🟡 SOFT DELETE - có người phụ thuộc
      const updated = await prisma.comment.update({
        where: { id },
        data: {
          isDeleted: true,
          deletedAt: new Date(),
          content: "[Bình luận đã bị xoá]",
        },
        include: {
          user: {
            select: { id: true, name: true, avatarUrl: true },
          },
          replyToUser: {
            select: { id: true, name: true },
          },
          parent: {
            select: {
              id: true,
              isDeleted: true,
              user: { select: { id: true, name: true } },
            },
          },
        },
      });

      // Sanitize data
      const sanitized = {
        ...updated,
        userId: null,
        user: null,
        replyToUserId: null,
        replyToUser: null,
        displayName: null,
      };

      return res.json({
        message: "Đã ẩn comment",
        deleteType: "soft",
        comment: sanitized,
      });
    } else {
      // 🔴 HARD DELETE - chưa có ai phụ thuộc
      await prisma.comment.delete({
        where: { id },
      });

      return res.json({
        message: "Đã xóa comment",
        deleteType: "hard",
        commentId: id,
      });
    }
  } catch (err) {
    console.error("Delete comment error:", err);
    res.status(500).json({ message: "Delete comment failed" });
  }
};
