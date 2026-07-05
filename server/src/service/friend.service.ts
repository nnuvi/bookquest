import ApiError from "../lib/apiError.js";
import FriendRequest from "../model/FriendRequest.model.js";
import User, { UserSchemaType } from "../model/user.model.js";
// import { FriendRequestAction } from "../validation/friend.validation.js";
import type { FriendRequestAction } from "../model/FriendRequest.model.js";
import { createNotification } from "./notification.service.js";
import { getUserOrThrow, ensureNotSelf } from "./user.service.js";
// import { FriendRequestActionEvents } from "../types/notification.js";
import type { NotificationEvent } from "../types/notification.js";
import { NotificationEvents } from "../model/Notification.model.js";
import logger from "../config/logger.js";
import { HTTP_STATUS } from "../constant/httpStatus.js";
import { FriendStatus } from "../types/user.js";

export async function getFriendStatus(
  currentUserId: string,
  targetUserId: string,
): Promise<FriendStatus> {
  ensureNotSelf(currentUserId, targetUserId);

  const [isFriend, request] = await Promise.all([
    User.exists({
      _id: targetUserId,
      friends: currentUserId,
    }),
    FriendRequest.findOne({
      status: "pending",
      $or: [
        { from: currentUserId, to: targetUserId },
        { from: targetUserId, to: currentUserId },
      ],
    }).select("from"),
  ]);

  if (isFriend) return "friend";

  if (!request) return "none";

  return request.from.toString() === currentUserId
    ? "request_sent"
    : "request_received";
}

export async function getFriendRequests(userId: string) {
  logger.debug("Fetching friend requests", { userId });

  const friendRequests = await FriendRequest.find({
    to: userId,
    status: "pending",
  })
    .populate("from", "fullName username profileImage")
    .sort({ createdAt: -1 })
    .lean();

  logger.debug("Friend requests fetched", {
    userId,
    count: friendRequests.length,
  });

  return {
    success: true,
    data: friendRequests,
  };
}

export async function removeFriend(userId: string, friendId: string) {
  ensureNotSelf(userId, friendId);

  const friend = await getUserOrThrow(friendId);

  if (!isFriend(friend, userId)) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "You are not friends.");
  }

  await removeFriends(userId, friendId);

  return {
    success: true,
    message: "Friend removed successfully.",
  };
}

export async function sendFriendRequest(
  senderId: string,
  receiverId: string,
  senderName: string,
) {
  ensureNotSelf(senderId, receiverId);

  const receiver = await getUserOrThrow(receiverId);

  if (isFriend(receiver, senderId)) {
    throw new ApiError(HTTP_STATUS.CONFLICT, "You are already friends.");
  }

  await ensureNoPendingRequest(senderId, receiverId);

  const friendRequest = await FriendRequest.create({
    from: senderId,
    to: receiverId,
  });

  await createNotification({
    from: senderId,
    to: receiverId,
    event: NotificationEvents.FRIEND_REQUEST_SENT,
    message: `${senderName} sent you a friend request.`,
  });

  return {
    success: true,
    message: "Friend request sent successfully.",
    data: friendRequest,
  };
}

export async function respondFriendRequest(
  userId: string,
  requestId: string,
  action: FriendRequestAction,
  fullName: string,
) {
  const request = await ensurePendingRequest(requestId, userId);

  const senderId = request.from.toString();
  const receiverId = request.to.toString();
  const accepted = action === "accepted";

  request.status = action;

  await Promise.all([
    request.save(),
    accepted ? addFriends(senderId, receiverId) : Promise.resolve(),
  ]);

  await createNotification({
    from: userId,
    to: senderId,
    event: accepted
      ? NotificationEvents.FRIEND_REQUEST_ACCEPTED
      : NotificationEvents.FRIEND_REQUEST_DECLINED,
    message: accepted
      ? `${fullName} accepted your friend request.`
      : `${fullName} declined your friend request.`,
  });

  return {
    success: true,
    message: accepted ? "Friend request accepted." : "Friend request declined.",
  };
}

function isFriend(user: UserSchemaType, friendId: string): boolean {
  return user.friends.some((id) => id.toString() === friendId);
}

async function ensureNoPendingRequest(
  senderId: string,
  receiverId: string,
): Promise<void> {
  const request = await FriendRequest.findOne({
    status: "pending",
    $or: [
      { from: senderId, to: receiverId },
      { from: receiverId, to: senderId },
    ],
  }).select("from");

  if (!request) return;

  if (request.from.toString() === senderId) {
    throw new ApiError(HTTP_STATUS.CONFLICT, "Friend request already sent.");
  }

  throw new ApiError(
    HTTP_STATUS.CONFLICT,
    "This user has already sent you a friend request.",
  );
}

async function ensurePendingRequest(requestId: string, userId: string) {
  const request = await FriendRequest.findById(requestId);

  if (!request) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Friend request not found.");
  }

  if (request.to.toString() !== userId) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, "Not authorized.");
  }

  if (request.status !== "pending") {
    throw new ApiError(HTTP_STATUS.CONFLICT, "Friend request already handled.");
  }

  return request;
}

async function addFriends(user1: string, user2: string): Promise<void> {
  await Promise.all([
    User.findByIdAndUpdate(user1, {
      $addToSet: { friends: user2 },
    }),
    User.findByIdAndUpdate(user2, {
      $addToSet: { friends: user1 },
    }),
  ]);
}

async function removeFriends(user1: string, user2: string): Promise<void> {
  await Promise.all([
    User.findByIdAndUpdate(user1, {
      $pull: { friends: user2 },
    }),
    User.findByIdAndUpdate(user2, {
      $pull: { friends: user1 },
    }),
  ]);
}
