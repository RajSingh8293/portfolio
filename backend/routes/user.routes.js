import express, { Router } from "express";
import {
  forgotPassword,
  registerUser,
  getUserById,
  loginUser,
  logoutUser,
  profileUser,
  resetPassword,
  updateProfile,
  uploadProfileImage,
  allUsers,
  deletUserById,
  emailVerify,
  deletAllUsers,
} from "../controllers/user.controllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import uploadToCloudinary from "../middleware/cloudinaryUpload.js";

const userRouter = Router();

// user
userRouter.get("/", allUsers);
userRouter.delete("/:id", deletUserById);
userRouter.delete("/", deletAllUsers);
userRouter.post("/register", registerUser);
userRouter.post("/email-verify", emailVerify);
userRouter.post(
  "/upload-profile",
  authMiddleware,
  uploadToCloudinary.single("profileImage"),
  uploadProfileImage
);

userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);
userRouter.get("/profile", authMiddleware, profileUser);
userRouter.put("/update-profile", authMiddleware, updateProfile);
userRouter.get("/:id", authMiddleware, getUserById);

export default userRouter;
