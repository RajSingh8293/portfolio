import express, { Router } from "express";
import {
  createAboutSection,
  getAboutSectionData,
  updateAboutSectionData,
  uploadAboutImage,
} from "../controllers/about.controllers.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import uploadToCloudinary from "../middleware/cloudinaryUpload.js";

const aboutRouter = Router();

// Create about
aboutRouter.post(
  "/create",
  //   uploadToCloudinary.single("aboutImage"),
  authMiddleware,
  isAdmin,
  createAboutSection
);

// Get About
aboutRouter.get("/", getAboutSectionData);

// Update title and description
aboutRouter.put("/update/:id", isAdmin, authMiddleware, updateAboutSectionData);

// Update image
aboutRouter.put(
  "/image/:id",
  authMiddleware,
  isAdmin,
  uploadToCloudinary.single("aboutImage"),
  uploadAboutImage
);

export default aboutRouter;
