// Sign up
import jwt from "jsonwebtoken";
import user from "../models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password || !bio) {
      return res.json({
        success: false,
        message: "Missing details",
      });
    }
    const isUser = await user.findOne({ email });
    if (isUser) {
      return res.json({
        success: false,
        message: "Account already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await user.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });
    const token = generateToken(newUser._id);

    res.json({
      success: true,
      userData: newUser,
      token,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Controller to login a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await user.findOne({ email });

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }    

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    if (!isPasswordCorrect) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(userData._id);

    res.json({
      success: true,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Controller to check if user is authenticated
export const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, profilePic, bio } = req.body;

    const userId = req.user._id;

    let updatedUser;
    if (!profilePic) {
      updatedUser = await user.findByIdAndUpdate(
        userId,
        {
          bio,
          fullName,
        },
        { returnDocument: "after" }
        // { new: true },
      );
    } else {
        const upload = await cloudinary.uploader.upload(profilePic);

        updatedUser = await user.findByIdAndUpdate(userId, {
            profilePic: upload.secure_url,
            bio,
            fullName
        }, {new: true})
    }
    res.json({
        success: true,
        user: updatedUser
    })
  } catch (error) {
    console.log(error.message);
    res.json({
        success: false,
        message: error.message
    })
  }
};
