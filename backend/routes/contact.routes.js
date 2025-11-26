import express, { Router } from "express";

import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import {
  createContactSection,
  getContactSectionData,
  updateContactSection,
} from "../controllers/contact.controllers.js";

const contactRouter = Router();

// Create hero
contactRouter.post(
  "/create",
  // uploadToCloudinary.single("heroImage"),
  authMiddleware,
  isAdmin,
  createContactSection
);

// Get hero
contactRouter.get("/", getContactSectionData);

// Update title
contactRouter.put("/update/:id", authMiddleware, isAdmin, updateContactSection);

export default contactRouter;
