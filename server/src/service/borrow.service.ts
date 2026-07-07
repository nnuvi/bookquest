import ApiError from "../lib/apiError.js";
import FriendRequest from "../model/FriendRequest.model.js";
import User, { UserSchemaType } from "../model/user.model.js";
// import { FriendRequestAction } from "../validation/friend.validation.js";
// import type { FriendRequestAction } from "../model/FriendRequest.model.js";
import { createNotification } from "./notification.service.js";
import { getUserOrThrow, ensureNotSelf } from "./user.service.js";
// import { FriendRequestActionEvents } from "../types/notification.js";
import type { NotificationEvent } from "../types/notification.js";
import { NotificationEvents } from "../model/Notification.model.js";
import BorrowRequest from "../model/BorrowRequest.model.js";
import logger from "../config/logger.js";

// const populateUserBook = {
//   path: "userBook",
//   populate: {
//     path: "book",
//     select: "title author coverImage",
//   },
// };
// .populate(populateUserBook)

export async function getBorrowRequests(userId: string) {
  const borrowRequests = await BorrowRequest.find({
    owner: userId,
    status: "pending",
  })
    .populate("requester", "fullName username profileImage")
    .populate({
      path: "userBook",
      populate: {
        path: "book",
        select: "title author coverImage",
      },
    })
    .sort({ createdAt: -1 });

  logger.debug("getBorrowRequests: ", borrowRequests);

  return {
    success: true,
    data: borrowRequests,
  };
}

export async function getBorrowSentRequests(userId: string) {
  const borrowSentRequests = await BorrowRequest.find({
    requester: userId,
    status: "pending",
  })
    .populate("owner", "fullName username profileImage")
    .populate({
      path: "userBook",
      populate: {
        path: "book",
        select: "title author coverImage",
      },
    })
    .sort({ createdAt: -1 });

  logger.debug("getBorrowSentRequests: ", borrowSentRequests);

  return {
    success: true,
    data: borrowSentRequests,
  };
}
