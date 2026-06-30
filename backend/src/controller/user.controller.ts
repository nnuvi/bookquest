import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import User, { UserSchemaType } from "../model/user.model.js";

import ApiError from "../lib/apiError.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { HTTP_STATUS } from "../constant/httpStatus.js";

import { FilterQuery } from "mongoose";

export const getMyProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "User not found."
      );
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: user,
    });
  }
);

export const getUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "User not found."
      );
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: user,
    });
  }
);

export const editProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      fullName,
      username,
      email,
      currentPassword,
      newPassword,
      bio,
      profileImg,
      coverImg,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "User not found."
      );
    }

    if (newPassword) {
      if (!currentPassword) {
        throw new ApiError(
          HTTP_STATUS.BAD_REQUEST,
          "Current password is required."
        );
      }

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!isPasswordValid) {
        throw new ApiError(
          HTTP_STATUS.UNAUTHORIZED,
          "Current password is incorrect."
        );
      }

      if (newPassword.length < 6) {
        throw new ApiError(
          HTTP_STATUS.BAD_REQUEST,
          "Password must be at least 6 characters long."
        );
      }

      user.password = await bcrypt.hash(newPassword, 10);
    }

    user.fullName = fullName ?? user.fullName;
    user.username = username ?? user.username;
    user.email = email ?? user.email;
    user.bio = bio ?? user.bio;
    user.profileImg = profileImg ?? user.profileImg;
    // user.coverImg = coverImg ?? user.coverImg;

    await user.save();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Profile updated successfully.",
      data: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImg: user.profileImg,
        // coverImg: user.coverImg,
      },
    });
  }
);

// export const friendsRequestSendUnsend = asyncHandler(
//   async (req: Request, res: Response) => {
//     const userId = req.user._id;
//     const friendId = req.params.id;

//     const [user, friend] = await Promise.all([
//       User.findById(userId),
//       User.findById(friendId),
//     ]);

//     if (!user || !friend) {
//       throw new ApiError(
//         HTTP_STATUS.NOT_FOUND,
//         "User not found."
//       );
//     }

//     if (user._id.equals(friend._id)) {
//       throw new ApiError(
//         HTTP_STATUS.BAD_REQUEST,
//         "You cannot add yourself as a friend."
//       );
//     }

//     const isFriend = user.friends.some((id) =>
//       id.equals(friend._id)
//     );

//     if (!isFriend) {
//       user.friends.push(friend._id);
//       friend.friends.push(user._id);

//       await Promise.all([
//         user.save(),
//         friend.save(),
//       ]);

//       return res.status(HTTP_STATUS.OK).json({
//         success: true,
//         message: "Friend added successfully.",
//       });
//     }

//     await Promise.all([
//       User.findByIdAndUpdate(userId, {
//         $pull: { friends: friend._id },
//       }),
//       User.findByIdAndUpdate(friendId, {
//         $pull: { friends: user._id },
//       }),
//     ]);

//     res.status(HTTP_STATUS.OK).json({
//       success: true,
//       message: "Friend removed successfully.",
//     });
//   }
// );

export const friendList = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "User not found."
      );
    }

    const friends = await User.find({
      _id: { $in: user.friends },
    }).select("-password");

    res.status(HTTP_STATUS.OK).json({
      success: true,
      count: friends.length,
      data: friends,
    });
  }
);

export const getUsers = asyncHandler(
  async (req: Request, res: Response) => {
    const { search, limit } = req.query;

    const query: FilterQuery<UserSchemaType> = {};

    if (typeof search === "string" && search.trim()) {
      query.$or = [
        {
          username: {
            $regex: search,
            $options: "i",
          },
        },
        {
          fullName: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const pageLimit =
      typeof limit === "string"
        ? Number(limit) || 5
        : 5;

    const users = await User.find(query)
      .select("-password")
      .limit(pageLimit)
      .exec();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      count: users.length,
      data: users,
    });
  }
);