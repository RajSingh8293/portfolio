import express, { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
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
  createContactSection
);

// Get hero
contactRouter.get("/", getContactSectionData);

// Update title
contactRouter.put("/update/:id", authMiddleware, updateContactSection);

export default contactRouter;
