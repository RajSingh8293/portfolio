import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../middleware/sendEmail.js";
import User from "../modals/user.model.js";
import cloudinary from "../config/cloudinary.js";

const OTP_EXPIRES_MINUTES = 15;
export const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {}
};

// single user
export const deletUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userDelete = await User.findByIdAndDelete(user?._id);

    res.status(200).json({
      success: true,
      message: "User deleted succefully",
      userDelete,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting user",
    });
  }
};
// delete all users
export const deletAllUsers = async (req, res) => {
  try {
    const users = await User.deleteMany();

    if (!users) {
      return res.status(404).json({
        success: false,
        message: "Users not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users deleted succefully",
      users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting users",
    });
  }
};
// register user
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("req.body :", req.body);

  try {
    if (!username) {
      return res.status(422).json({ message: "Username is required !" });
    }
    if (!email) {
      return res.status(422).json({ message: "Email is required !" });
    }
    if (!password) {
      return res.status(422).json({ message: "Password is required !" });
    }

    // existing user
    const existsUser = await User.findOne({ email });
    if (existsUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists !" });
    }

    // password hash
    const hashPassword = bcrypt.hashSync(password, 8);
    // Generate OTP
    // const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp = crypto.randomInt(100000, 999999).toString();
    const expireTime = Date.now() + OTP_EXPIRES_MINUTES * 60 * 1000;

    const userdata = new User({
      username,
      email,
      password: hashPassword,
      verifyEmailOtp: otp,
      verifyEmailOtpExpire: expireTime,
    });

    const user = await userdata.save();

    const { password: pass, verifyEmailOtp: verify, ...rest } = user._doc; //  hide passwrod

    const htmlMessage = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .button { 
            display: inline-block; 
            padding: 12px 24px; 
            background-color: #4F46E5; 
            color: white; 
            text-decoration: none; 
            border-radius: 6px; 
            margin: 20px 0;
          }
          .footer { margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Verify Email </h2>
          <p>You requested to verify email .Copy and paste below  OTP for login:</p>
          
        
          
          <p>${otp}</p>
          
          <p>This otp will expire in 15 minutes for security reasons.</p>
          
          <div class="footer">
            <p>If you didn't request, please ignore this email.</p>
            <p>Your account security is important to us.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    const data = {
      email: user.email,
      subject: "Email verification Request",
      message: `Please use the following OTP to verify your email : ${otp}`,
      html: htmlMessage, // Add HTML version for email clients
    };

    await sendEmail(data);
    // res.status(201).cookie("token", token, options).json({
    res.status(201).json({
      success: true,
      message: "Register successful. OTP sent to email!",
      user: rest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error with registration",
      error,
    });
  }
};

export const emailVerify = async (req, res) => {
  const { otp } = req.body;

  try {
    const user = await User.findOne({ verifyEmailOtp: otp });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    if (user.verifyEmailOtp !== Number(otp)) {
      return res.status(400).json({ success: false, message: "Invalid OTP!" });
    }

    // Check expiration
    if (user.verifyEmailOtpExpire < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired! Please request a new one.",
      });
    }
    user.verifyEmailOtp = undefined;
    user.verifyEmailOtpExpire = undefined;
    user.isVerified = true;

    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const { password: pass, ...rest } = user._doc; //  hide passwrod
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    };
    res.status(201).cookie("token", token, options).json({
      success: true,
      message: "Email verify successfylly!",
      user: rest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error with email verification",
      error,
    });
  }
};

// login user
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   if (!password) {
//     return res
//       .status(404)
//       .json({ success: false, message: "Password is required !" });
//   }
//   if (!email) {
//     return res
//       .status(404)
//       .json({ success: false, message: "Email is required !" });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       res.status(400).send({
//         success: false,
//         message: "User does not exists",
//       });
//     }

//     const isMatch = bcrypt.compareSync(password, user.password);
//     if (!isMatch) {
//       res.status(400).send({
//         success: false,
//         message: "Invalid data !",
//       });
//     }

//     // If user not verified → Send new OTP
//     if (!user.isVerified) {
//       const otp = Math.floor(1000 + Math.random() * 9000);
//       const expireTime = Date.now() + OTP_EXPIRES_MINUTES * 60 * 1000;

//       user.verifyEmailOtp = otp;
//       user.verifyEmailOtpExpire = expireTime;
//       await user.save();

//       await sendEmail({
//         email: user.email,
//         subject: "Email Verification",
//         message: `Your OTP for email verification is: ${otp}`,
//       });

//       return res.status(403).json({
//         success: false,
//         message: "Email not verified. OTP sent again!",
//       });
//     }

//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     const options = {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//     };
//     const { password: pass, ...rest } = user._doc; // hide password
//     res.status(200).cookie("token", token, options).json({
//       success: true,
//       message: "Logged in successfully",
//       user: rest,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: "Error with login",
//       error,
//     });
//   }
// };
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Email and Password are required!",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials!",
      });
    }

    // If user not verified → Send new OTP
    if (!user.isVerified) {
      // const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otp = crypto.randomInt(100000, 999999).toString();
      const expireTime = Date.now() + OTP_EXPIRES_MINUTES * 60 * 1000;

      user.verifyEmailOtp = otp;
      user.verifyEmailOtpExpire = expireTime;
      await user.save();

      const htmlMessage = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .button { 
            display: inline-block; 
            padding: 12px 24px; 
            background-color: #4F46E5; 
            color: white; 
            text-decoration: none; 
            border-radius: 6px; 
            margin: 20px 0;
          }
          .footer { margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Email Verification </h2>
          <p>You requested to verify email .Copy and paste below  OTP for login:</p>
          <p>${otp}</p>
          
          <p>This otp will expire in 15 minutes for security reasons.</p>
          
          <div class="footer">
            <p>If you didn't request, please ignore this email.</p>
            <p>Your account security is important to us.</p>
          </div>
        </div>
      </body>
      </html>
    `;
      const data = {
        email: user.email,
        subject: "Email verification Request",
        message: `Please use the following OTP to verify your email : ${otp}`,
        html: htmlMessage, // Add HTML version for email clients
      };

      await sendEmail(data);

      return res.status(403).json({
        success: true,
        message: "Email not verified. OTP sent again!",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    };

    const { password: pass, ...rest } = user._doc;

    res.status(200).cookie("token", token, options).json({
      success: true,
      message: "Logged in successfully",
      user: rest,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error with login",
      error,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    };

    return res.status(200).clearCookie("token", options).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something wrong with logout",
    });
  }
};
export const profileUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select(
      "-password -verifyEmailOtp"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching profile data",
    });
  }
};

export const uploadProfileImage = async (req, res) => {
  try {
    const userId = req.user._id; // `requireAuth` middleware must set req.user
    const profileImage = req.file?.path; // Cloudinary URL
    const publicId = req.file?.filename || req.file?.public_id;

    if (!profileImage) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Find existing user
    const user = await User.findById(userId).select("-password");

    // Delete old image if exists
    if (user?.profileImagePublicId) {
      await cloudinary.uploader.destroy(user.profileImagePublicId);
    }
    // Update with new image
    user.profileImage = profileImage;
    user.profileImagePublicId = publicId;
    await user.save();
    // const updatedUser = await User.findByIdAndUpdate(
    //   userId,
    //   { profileImage, profileImagePublicId: publicId },
    //   { new: true }
    // ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile image uploaded successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to upload profile image",
      error,
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { username, email, bio } = req.body;

    // Build update object
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (bio) updateData.bio = bio;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error,
    });
  }
};

// single user
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching profile data",
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      // For security reasons, don't reveal if the user exists or not
      return res.status(200).json({
        success: true,
        message: "If the email exists, a password reset link has been sent",
      });
    }

    const generateToken = crypto.randomBytes(20).toString("hex");
    if (!generateToken) {
      return res.status(500).json({
        success: false,
        message: "An error occurred. Please try again later",
      });
    }

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(generateToken)
      .digest("hex");

    // expire will be after 15 minutes
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    // Create the frontend reset password URL
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/login?token=${user.resetPasswordToken}`;

    console.log("resetPasswordUrl :", resetPasswordUrl);

    // HTML email template for better appearance
    const htmlMessage = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .button { 
            display: inline-block; 
            padding: 12px 24px; 
            background-color: #4F46E5; 
            color: white; 
            text-decoration: none; 
            border-radius: 6px; 
            margin: 20px 0;
          }
          .footer { margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Password Reset Request</h2>
          <p>You requested to reset your password. Click the button below to create a new password:</p>
          
          <a href="${resetPasswordUrl}" class="button">Reset Password</a>
          
          <p>Or copy and paste this link into your browser:</p>
          <p>${resetPasswordUrl}</p>
          
          <p>This link will expire in 15 minutes for security reasons.</p>
          
          <div class="footer">
            <p>If you didn't request this password reset, please ignore this email.</p>
            <p>Your account security is important to us.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const data = {
      email: user.email,
      subject: "Password Reset Request",
      message: `Please use the following link to reset your password: ${resetPasswordUrl}`,
      html: htmlMessage, // Add HTML version for email clients
    };

    await sendEmail(data);

    return res.status(200).json({
      success: true,
      message: "If the email exists, a password reset link has been sent",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    console.log("req.body :", req.body);

    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Reset password token is invalid or has been expired",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password does not match!",
      });
    }

    // const hashPassword = authHashPassword(password);
    // const hashPassword = bcrypt.compareSync(password, user.password);
    const hashPassword = bcrypt.hashSync(password, 8);

    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Passsword update successfully",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error with reseting password",
      error,
    });
  }
};
