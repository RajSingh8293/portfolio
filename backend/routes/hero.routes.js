import express, { Router } from "express";
import {
  createHeroSection,
  getHeroSectionData,
  updateHeroSectionData,
  uploadHeroImage,
} from "../controllers/hero.controllers.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import uploadToCloudinary from "../middleware/cloudinaryUpload.js";

const heroRouter = Router();

// Create hero
heroRouter.post(
  "/create",
  // uploadToCloudinary.single("heroImage"),
  authMiddleware,
  isAdmin,
  createHeroSection
);

// Get hero
heroRouter.get("/", getHeroSectionData);

// Update title
heroRouter.put("/update/:id", authMiddleware, isAdmin, updateHeroSectionData);

// Update image
heroRouter.put(
  "/image/:id",
  authMiddleware,
  isAdmin,
  uploadToCloudinary.single("heroImage"),
  uploadHeroImage
);

export default heroRouter;
