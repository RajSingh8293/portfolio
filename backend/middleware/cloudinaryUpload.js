import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Custom Cloudinary storage (auto detect resource type)
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const fileType = file.mimetype.startsWith("video") ? "video" : "image";

    return {
      folder: "portfolio",
      resource_type: fileType, // 'image' or 'video'
      public_id: Date.now().toString(),
    };
  },
});

const uploadToCloudinary = multer({ storage });

export default uploadToCloudinary;
