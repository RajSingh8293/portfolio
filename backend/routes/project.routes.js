import express, { Router } from "express";
import {
  createProjectSection,
  getProjectsSectionData,
  updateProjectData,
  uploadProjectImage,
} from "../controllers/project.controllers.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import uploadToCloudinary from "../middleware/cloudinaryUpload.js";

const projectRouter = Router();

// Create about
projectRouter.post(
  "/create",
  uploadToCloudinary.single("projectImage"),
  authMiddleware,
  isAdmin,
  createProjectSection
);

// Get About
projectRouter.get("/", getProjectsSectionData);

// Update title and description
projectRouter.put("/update/:id", authMiddleware, isAdmin, updateProjectData);

// // Update image
projectRouter.put(
  "/image/:id",
  authMiddleware,
  isAdmin,
  uploadToCloudinary.single("projectImage"),
  uploadProjectImage
);

export default projectRouter;
