import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import User from "../model/user.model.js";

import { HTTP_STATUS } from "../constant/httpStatus.js";
import ApiError from "../lib/apiError.js";
import { asyncHandler } from "../lib/asyncHandler.js";

import * as userService from "../service/user.service.js";
import { mapUsers } from "../types/user.js";

export const getMyProfile = asyncHandler(
  async (req: Request, res: Response) => {
    // const user = await User.findById(req.user._id).select("-password");
    const user = await userService.getFormatUserOrThrow(req.user._id);

    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found.");
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: user,
    });
  },
);

export const getUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    // const user = await User.findById(req.params.id).select("-password");
    const user = await userService.getFormatUserOrThrow(req.params.id!);

    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found.");
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: user,
    });
  },
);

export const updateMyProfileImage = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await userService.updateProfileImage(req.user._id, req.file);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Image Uploaded Successfully",
      data: user,
    });
  },
);

export const editProfile = asyncHandler(async (req: Request, res: Response) => {
  const {
    fullName,
    username,
    email,
    currentPassword,
    newPassword,
    bio,
    profileImage,
    coverImg,
  } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found.");
  }

  if (newPassword) {
    if (!currentPassword) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Current password is required.",
      );
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Current password is incorrect.",
      );
    }

    if (newPassword.length < 6) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Password must be at least 6 characters long.",
      );
    }

    user.password = await bcrypt.hash(newPassword, 10);
  }

  if (!user.profileImage) {
    user.profileImage = {
      url: "",
      publicId: "",
    };
  }

  user.fullName = fullName ?? user.fullName;
  user.username = username ?? user.username;
  user.email = email ?? user.email;
  user.bio = bio ?? user.bio;
  user.profileImage.url = profileImage ?? user.profileImage.url;
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
      profileImage: user.profileImage.url,
      // coverImg: user.coverImg,
    },
  });
});

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

export const friendList = asyncHandler(async (req: Request, res: Response) => {
  const friends = await userService.getFriendList(req.user._id)

  res.status(HTTP_STATUS.OK).json({
    success: true,
    count: friends.length,
    data: friends,
  });
});

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const { limit } = req.query;

  const pageLimit =
    typeof limit === "string" ? Math.max(1, Number(limit) || 5) : 5;

  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 })
    .limit(pageLimit)
    .lean();

  res.status(HTTP_STATUS.OK).json({
    success: true,
    count: users.length,
    data: mapUsers(users),
  });
});

export const searchUsers = asyncHandler(async (req: Request, res: Response) => {
  const { query } = req.query;

  if (typeof query !== "string" || query.trim().length < 2) {
    res.status(HTTP_STATUS.OK).json({
      success: true,
      count: 0,
      data: [],
    });

    return;
  }

  const keyword = query.trim();

  const users = await User.find({
    $or: [
      {
        username: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        fullName: {
          $regex: keyword,
          $options: "i",
        },
      },
    ],
  })
    .select("-password")
    .sort({ username: 1 })
    .limit(20)
    .lean();

  res.status(HTTP_STATUS.OK).json({
    success: true,
    count: users.length,
    data: mapUsers(users),
  });
});
