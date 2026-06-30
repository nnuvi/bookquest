import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "../model/user.model.js";
import ApiError from "../lib/apiError.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { Authtoken } from "../types/auth.js";
import { HTTP_STATUS } from "../constant/httpStatus.js";

export const protectRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.jwt;

    if (!token) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Authentication required. No token provided.");
    }

    let decoded: Authtoken;

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as Authtoken;
    } catch {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid or expired token.");
    }

    if (!decoded.userID) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid token payload.");
    }

    const user = await User.findById(decoded.userID).select("-password");

    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found.");
    }

    req.user = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
    };

    next();
  }
);