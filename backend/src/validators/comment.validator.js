import { z } from "zod";

export const createCommentSchema = z.object({
  body: z.object({
    content: z.string().min(1),
    entityId: z.uuid(),
    entityType: z.enum(["POST", "PROJECT", "PHOTO"]),
  }),
});

export const createGuestCommentSchema = z.object({
  body: z.object({
    content: z.string().min(1),
    entityId: z.uuid(),
    entityType: z.enum(["POST", "PROJECT", "PHOTO"]),
    displayName: z.string().min(1).max(50),
    parentId: z.uuid().optional(),
  }),
});

export const createReplyCommentSchema = z.object({
  body: z.object({
    content: z.string().min(1, "Content không được rỗng"),
  }),
});

