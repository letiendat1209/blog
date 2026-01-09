import slugify from "slugify";
import crypto from "crypto";

export async function generateUniqueSlug(title, prisma) {
  const base = slugify(title, { lower: true, strict: true });
  let slug = base;
  let i = 1;

  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = `${base}-${i++}`;
  }

  return slug;
}

export function calcReadTime(content) {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 220);
}

export const getClientIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    return forwarded.split(",")[0];
  }

  return req.socket.remoteAddress;
};

export const hashViewer = (ip, ua) => {
  return crypto.createHash("sha256").update(`${ip}-${ua}`).digest("hex");
};
