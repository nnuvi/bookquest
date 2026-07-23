import User from "../model/user.model.js";
import ApiError from "../lib/ApiError.js";
import { HTTP_STATUS } from "../constant/httpStatus.js";
import {
  deleteImage,
  ensureImageProvided,
  uploadImage,
} from "./upload.service.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import logger from "../config/logger.js";
import { mapUser, mapUsers } from "../types/user.js";

export async function updateProfileImage(
  userId: string,
  file?: Express.Multer.File,
) {
  logger.info("Updating profile image.");

  try {
    const image = ensureImageProvided(file);

    const user = await getUserOrThrow(userId);

    if (user.profileImage?.publicId) {
      logger.debug("Deleting previous profile image.", {
        publicId: user.profileImage.publicId,
      });

      await deleteImage(user.profileImage.publicId);
    }

    const result = await uploadImage(image.buffer, {
      folder: "bookquest/profile-images",
    });

    logger.debug("uploadImage result: ", { result });

    user.profileImage = {
      url: result.secure_url,
      publicId: result.public_id,
    };

    logger.debug("iloaded Image: ", {
      user,
    });

    await user.save();

    logger.debug("Profile image updated.", {
      userId,
      publicId: result.public_id,
    });
    logger.info("Profile image updated.");

    return user;
  } catch (error) {
    logger.error("Failed to update profile image.", {
      userId,
      error,
    });

    throw error;
  }
}

export async function getFriendList(userId: string) {
  const user = await getUserOrThrow(userId);

  const friends = await User.find({
    _id: { $in: user.friends },
  });

  // return mapUsers(friends);

  return friends.map((user) => ({
    _id: user._id,
    username: user.username,
    fullName: user.fullName,
    email: user.email,
    bio: user.bio,
    role: user.role,

    profileImage: {
      url: user?.profileImage?.url,
    },

    friends: user.friends,
  }));
}

export async function getUserOrThrow(userId: string) {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found.");
  }

  return user;
}

// export async function getFormatUserOrThrow(userId: string) {
//   const user = await User.findById(userId).populate("");

//   if (!user) {
//     throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found.");
//   }

//   return {
//     _id: user._id,
//     username: user.username,
//     fullName: user.fullName,
//     email: user.email,
//     bio: user.bio,
//     role: user.role,

//     profileImage: user.profileImage?.url || "",

//     friends: user.friends,
//   };
// }

export function ensureNotSelf(userId: string, otherUserId: string) {
  if (userId === otherUserId) {
    throw new ApiError(400, "You cannot perform this action on yourself.");
  }
}
