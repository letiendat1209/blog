import { z } from "zod";

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(5, "Title ít nhất 5 ký tự"),
    content: z.string().min(20, "Content ít nhất 20 ký tự"),
    shortDescription: z
      .string()
      .max(300, "Short description tối đa 300 ký tự")
      .optional(),
    coverImage: z.url("Cover image phải là URL hợp lệ").optional(),
    seoTitle: z.string().max(70, "SEO title tối đa 70 ký tự").optional(),
    seoDescription: z
      .string()
      .max(160, "SEO description tối đa 160 ký tự")
      .optional(),
    isFeatured: z.boolean().optional(),
    categoryId: z.uuid("CategoryId không hợp lệ").optional(),
    tagIds: z.array(z.uuid("TagId không hợp lệ")).optional(),
  }),
});

export const updatePostSchema = z.object({
  body: z
    .object({
      title: z.string().min(5, "Title ít nhất 5 ký tự").optional(),

      content: z.any().optional(), // tiptap JSON, đừng dùng string

      shortDescription: z.string().max(300).optional(),

      coverImage: z.url().optional(),

      categoryId: z.string().optional(),

      tags: z.array(z.string()),

      // SEO
      slug: z.string().optional(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
    })
    .strict(),

  params: z.object({
    id: z.string().min(1),
  }),
});
