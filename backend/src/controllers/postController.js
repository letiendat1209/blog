import { redis } from "../lib/redis.js";
import { hashViewer } from "../utils/index.js";
import { prisma } from "../config/prisma.js";
import { calcReadTime, generateUniqueSlug } from "../utils/index.js";
import slugify from "slugify";

const VIEW_TTL = 60 * 60 * 6; // 6 tiếng

export const createPost = async (req, res) => {
  const data = req.body;

  const slug = await generateUniqueSlug(data.title, prisma);
  const readTime = calcReadTime(data.content);

  // 1️⃣ Chuẩn hóa tags
  const tagNames = Array.isArray(data.tags)
    ? data.tags.map((t) => t.trim()).filter(Boolean)
    : [];

  const tagsData = tagNames.map((name) => ({
    name,
    slug: slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    }),
  }));

  // 2️⃣ Tạo tag nếu chưa có
  if (tagsData.length) {
    await prisma.tag.createMany({
      data: tagsData,
      skipDuplicates: true,
    });
  }

  // 3️⃣ Lấy lại tag theo slug (chuẩn hơn name)
  const existingTags = await prisma.tag.findMany({
    where: {
      slug: { in: tagsData.map((t) => t.slug) },
    },
  });

  // 4️⃣ Tạo post + connect tag
  const post = await prisma.post.create({
    data: {
      title: data.title,
      slug,
      content: data.content,
      shortDescription: data.shortDescription,
      coverImage: data.coverImage,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      readTime,
      isFeatured: data.isFeatured ?? false,
      authorId: req.user.id,
      categoryId: data.categoryId,
      tags: {
        create: existingTags.map((tag) => ({
          tagId: tag.id,
        })),
      },
    },
    include: {
      tags: { include: { tag: true } },
    },
  });

  res.status(201).json(post);
};


export const getPosts = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;

    const isAdmin = req.user?.role === "ADMIN";

    // featured
    const featured =
      req.query.featured === "true"
        ? true
        : req.query.featured === "false"
        ? false
        : undefined;

    // status
    let status;

    if (isAdmin) {
      status = req.query.status; // ADMIN muốn gì cũng được
    } else {
      status = "PUBLISHED"; // USER luôn chỉ thấy published
    }

    // tags: "NodeJS,JWT" -> ["NodeJS", "JWT"]
    const tags = req.query.tags
      ? req.query.tags.split(",").map((t) => t.trim())
      : [];

    const where = {
      ...(status && { status }),
      ...(featured !== undefined && { isFeatured: featured }),
      ...(tags.length > 0 && {
        tags: {
          some: {
            tag: {
              slug: { in: tags },
            },
          },
        },
      }),
    };

    const orderBy = featured
      ? [{ isFeatured: "desc" }, { createdAt: "desc" }]
      : { createdAt: "desc" };

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
          tags: {
            include: {
              tag: {
                select: {
                  name: true,
                  slug: true,
                },
              },
            },
          },
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      }),
      prisma.post.count({ where }),
    ]);

    // 🔥 Normalize shape cho FE
    const normalizedPosts = posts.map((post) => ({
      ...post,
      tags: post.tags.map((pt) => pt.tag.name),
    }));

    return res.status(200).json({
      status: "success",
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data: normalizedPosts,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          avatarUrl: true,
          name: true,
          email: true,
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
      category: {
        select: { id: true, name: true, slug: true },
      },
    },
  });

  if (!post) return res.sendStatus(404);

  // flatten tags để frontend dễ dùng
  const flattenedPost = {
    ...post,
    tags: post.tags.map((pt) => pt.tag.name), // [{id, name, slug}, ...]
  };

  return res.json(flattenedPost);
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return res.sendStatus(404);

  // 1️⃣ Chuẩn hóa tags
  const tagNames = Array.isArray(data.tags)
    ? data.tags.map((t) => t.trim()).filter(Boolean)
    : null;

  let tagUpdate = undefined;

  if (tagNames) {
    const tagsData = tagNames.map((name) => ({
      name,
      slug: slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    }),
    }));

    await prisma.tag.createMany({
      data: tagsData,
      skipDuplicates: true,
    });

    const existingTags = await prisma.tag.findMany({
      where: {
        slug: { in: tagsData.map((t) => t.slug) },
      },
    });

    tagUpdate = {
      deleteMany: {}, // replace toàn bộ tag
      create: existingTags.map((tag) => ({
        tagId: tag.id,
      })),
    };
  }

  await prisma.post.update({
    where: { id },
    data: {
      title: data.title,
      content: data.content,
      shortDescription: data.shortDescription,
      coverImage: data.coverImage,
      categoryId: data.categoryId,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      isFeatured: data.isFeatured,
      readTime: data.content ? calcReadTime(data.content) : post.readTime,
      tags: tagUpdate,
    },
  });

  res.sendStatus(204);
};


export const publishPost = async (req, res) => {
  const { id } = req.params;

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return res.sendStatus(404);

  if (post.status === "PUBLISHED") {
    return res.status(400).json({ message: "Already published" });
  }

  await prisma.post.update({
    where: { id },
    data: {
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  res.sendStatus(204);
};

export const archivePost = async (req, res) => {
  const { id } = req.params;

  await prisma.post.update({
    where: { id },
    data: {
      status: "ARCHIVED",
    },
  });

  res.sendStatus(204);
};

//
export const trackPostView = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return res.status(400).json({ message: "Post id is required" });
    }

    // check post tồn tại
    const postExists = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true },
    });

    if (!postExists) {
      return res.status(404).json({ message: "Post not found" });
    }

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

    const userAgent = req.headers["user-agent"] || "unknown";

    const viewerHash = hashViewer(ip, userAgent);
    const redisKey = `post:view:${postId}:${viewerHash}`;

    // đã view trong TTL → skip
    const viewed = await redis.get(redisKey);
    if (viewed) {
      return res.json({ ok: true, counted: false });
    }

    // set redis trước để tránh race condition
    await redis.set(redisKey, "1", "EX", VIEW_TTL);

    // tăng view
    await prisma.post.update({
      where: { id: postId },
      data: {
        views: { increment: 1 },
      },
    });

    return res.json({ ok: true, counted: true });
  } catch (error) {
    console.error("trackPostView error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
