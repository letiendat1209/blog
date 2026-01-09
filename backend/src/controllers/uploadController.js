import { uploadImageToCloudinary } from "../services/cloudinaryService.js";

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await uploadImageToCloudinary(req.file, {
      folder: `posts/${req.user.id}/temp`,
    });

    res.status(201).json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (err) {
    next(err);
  }
};

