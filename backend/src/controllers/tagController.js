import { prisma } from "../config/prisma.js";

export const createTags = async (req, res) => {
  const { tags } = req.body;

  if (!Array.isArray(tags) || !tags.length) {
    return res.status(400).json({ message: "Tags invalid" });
  }

  const tagsData = tags.map((name) => ({
    name: name.trim(),
    slug: name.trim().toLowerCase().replace(/\s+/g, "-"),
  }));

  await prisma.tag.createMany({
    data: tagsData,
    skipDuplicates: true,
  });

  res.status(201).json({
    message: "Tags created",
    data: tagsData,
  });
};

export const getTags = async (req, res) => {
  const { search } = req.query;

  const filter = search
    ? {
        name: {
          contains: search,
          mode: "insensitive", // case-insensitive
        },
      }
    : {};

  const tags = await prisma.tag.findMany({
    where: filter,
    orderBy: { name: "asc" },
  });

  res.json(tags);
};

export const updateTags = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "Name is required" });

  const slug = name.trim().toLowerCase().replace(/\s+/g, "-");

  try {
    const updatedTag = await prisma.tag.update({
      where: { id },
      data: { name: name.trim(), slug },
    });

    res.json(updatedTag);
  } catch (error) {
    if (error.code === "P2002") {
      // duplicate unique field
      return res.status(409).json({ message: "Tag name already exists" });
    }
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const deleteTags = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.tag.delete({
      where: { id },
    });

    res.sendStatus(204); // deleted, no content
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const updateTagsBatch = async (req, res) => {
  const { tags } = req.body; // [{ id, name }, ...]

  if (!Array.isArray(tags) || !tags.length) {
    return res.status(400).json({ message: "Tags invalid" });
  }

  const results = [];

  for (const tag of tags) {
    const slug = tag.name.trim().toLowerCase().replace(/\s+/g, "-");

    try {
      const updatedTag = await prisma.tag.update({
        where: { id: tag.id },
        data: { name: tag.name.trim(), slug },
      });
      results.push({ success: true, tag: updatedTag });
    } catch (error) {
      if (error.code === "P2002") {
        // duplicate
        results.push({ success: false, id: tag.id, message: "Duplicate name" });
      } else {
        results.push({ success: false, id: tag.id, message: error.message });
      }
    }
  }

  res.json(results);
};

export const deleteTagsBatch = async (req, res) => {
  const { ids } = req.body; // ["id1", "id2", ...]

  if (!Array.isArray(ids) || !ids.length) {
    return res.status(400).json({ message: "Ids invalid" });
  }

  const results = [];

  for (const id of ids) {
    try {
      await prisma.tag.delete({ where: { id } });
      results.push({ id, success: true });
    } catch (error) {
      results.push({ id, success: false, message: error.message });
    }
  }

  res.json(results);
};


