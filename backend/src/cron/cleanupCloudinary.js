// cron/cleanupCloudinary.js

import cloudinary from "../lib/cloudinary.js";

export const cleanupTempImages = async () => {
  const result = await cloudinary.search
    .expression("folder:posts/*/temp AND resource_type:image")
    .sort_by("created_at", "asc")
    .max_results(100)
    .execute();

  const now = Date.now();

  for (const img of result.resources) {
    const createdAt = new Date(img.created_at).getTime();
    const hours = (now - createdAt) / 1000 / 60 / 60;

    if (hours > 24) {
      await cloudinary.uploader.destroy(img.public_id);
      console.log("Deleted orphan image:", img.public_id);
    }
  }
};
