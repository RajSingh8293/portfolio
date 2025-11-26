import jwt from "jsonwebtoken";
import User from "../modals/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized : No token found",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({
        message: "User Not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized : Invalid token" + error,
    });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "Access denied. Admin Only",
    });
  }
  next();
};
