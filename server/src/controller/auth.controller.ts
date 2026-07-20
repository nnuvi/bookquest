import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../model/user.model.js";

import { generateTokenAndSetCookie } from "../lib/generateToken.js";
import ApiError from "../lib/ApiError.js";
import { asyncHandler } from "../lib/asyncHandler.js";

import { HTTP_STATUS } from "../constant/httpStatus.js";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, username, email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid email address.");
  }

  if (password.length < 6) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Password must be at least 6 characters.",
    );
  }

  const [existingUsername, existingEmail] = await Promise.all([
    User.findOne({ username }),
    User.findOne({ email }),
  ]);

  if (existingUsername) {
    throw new ApiError(HTTP_STATUS.CONFLICT, "Username already exists.");
  }

  if (existingEmail) {
    throw new ApiError(HTTP_STATUS.CONFLICT, "Email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    username,
    email,
    password: hashedPassword,
  });

  generateTokenAndSetCookie(user._id.toString(), res);

  res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "User created successfully.",
    data: {
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      friends: user.friends,
      profileImage: user.profileImage?.url,
    },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      "Invalid username or password.",
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      "Invalid username or password.",
    );
  }

  generateTokenAndSetCookie(user._id.toString(), res);

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: {
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      friends: user.friends,
      profileImg: user.profileImg,
    },
  });
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie("jwt");

  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Logged out successfully.",
  });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found.");
  }

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: user,
  });
});
