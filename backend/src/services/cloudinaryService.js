// services/cloudinary.service.js
import streamifier from "streamifier";
import cloudinary from "../lib/cloudinary.js";

export const uploadImageToCloudinary = (file, options = {}) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || "posts/temp",
        resource_type: "image",
        transformation: [
          { width: 1600, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

export const deleteImageFromCloudinary = (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};
