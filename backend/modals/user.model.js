import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: { type: String },
    profileImagePublicId: { type: String },
    bio: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyEmailOtp: { type: Number },
    verifyEmailOtpExpire: Date,

    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
