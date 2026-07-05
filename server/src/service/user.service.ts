import User from "../model/user.model.js";
import ApiError from "../lib/apiError.js";
import { HTTP_STATUS } from "../constant/httpStatus.js";

export async function getUserOrThrow(userId: string) {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "User not found.");
  }

  return user;
}

export function ensureNotSelf(
  userId: string,
  otherUserId: string
) {
  if (userId === otherUserId) {
    throw new ApiError(
      400,
      "You cannot perform this action on yourself."
    );
  }
}