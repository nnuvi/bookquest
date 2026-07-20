import ApiError from "../lib/ApiError.js";
import FriendRequest from "../model/FriendRequest.model.js";
import User, { UserSchemaType } from "../model/user.model.js";
// import { FriendRequestAction } from "../validation/friend.validation.js";
import type {
  FriendRequestResponseAction,
  FriendRequestSchemaType,
} from "../model/FriendRequest.model.js";
import { createNotification } from "./notification.service.js";
import { getUserOrThrow, ensureNotSelf } from "./user.service.js";
// import { FriendRequestActionEvents } from "../types/notification.js";
import type { NotificationEvent } from "../types/notification.js";
import { NotificationEvents } from "../model/Notification.model.js";
import logger from "../config/logger.js";
import { HTTP_STATUS } from "../constant/httpStatus.js";
import { FriendStatus, FriendStatusDetails } from "../types/user.js";

export async function getFriendStatus(
  currentUserId: string,
  targetUserId: string,
): Promise<FriendStatusDetails> {
  ensureNotSelf(currentUserId, targetUserId);

  const [isFriend, request] = await Promise.all([
    User.exists({
      _id: targetUserId,
      friends: currentUserId,
    }),
    getPendingRequest(currentUserId, targetUserId),
  ]);

  if (isFriend) {
    return {
      status: "friend",
    };
  }

  if (!request) {
    return {
      status: "none",
    };
  }

  return {
    status:
      request.from.toString() === currentUserId
        ? "request_sent"
        : "request_received",
    requestId: request._id.toString(),
  };
}

export async function getFriendRequests(userId: string) {
  logger.debug("Fetching friend requests", { userId });

  const requests = await FriendRequest.find({
    to: userId,
    status: "pending",
  })
    .populate("from", "fullName username profileImage")
    .sort({ createdAt: -1 })
    .lean();

  logger.debug("Friend requests fetched", {
    count: requests.length,
  });

  return requests;
}

export async function removeFriend(
  userId: string,
  friendId: string,
): Promise<void> {
  ensureNotSelf(userId, friendId);

  const friend = await getUserOrThrow(friendId);

  ensureFriend(friend, userId);

  await removeFriends(userId, friendId);
}

export async function cancelFriendRequest(userId: string, requestId: string) {
  const request = await ensurePendingRequest(requestId);

  ensureRequestSender(request, userId);

  request.status = "cancelled";
  await request.save();

  return {
    success: true,
    message: "Friend request cancelled successfully.",
  };
}

export async function sendFriendRequest(
  senderId: string,
  receiverId: string,
  senderName: string,
) {
  ensureNotSelf(senderId, receiverId);

  const receiver = await getUserOrThrow(receiverId);

  ensureNotFriend(receiver, senderId);

  await ensureNoPendingRequest(senderId, receiverId);

  const friendRequest = await FriendRequest.create({
    from: senderId,
    to: receiverId,
  });

  await createNotification({
    from: senderId,
    to: receiverId,
    event: NotificationEvents.FRIEND_REQUEST_SENT,
    message: `sent you a friend request`,
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
  action: FriendRequestResponseAction,
  fullName: string,
) {
  const request = await ensurePendingRequest(requestId);

  ensureRequestReceiver(request, userId);

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
      ? `accepted your friend request`
      : `declined your friend request`,
  });

  return {
    success: true,
    message: accepted ? "Friend request accepted." : "Friend request declined.",
  };
}

function isFriend(user: UserSchemaType, friendId: string): boolean {
  return user.friends.some((id) => id.toString() === friendId);
}

function ensureFriend(user: UserSchemaType, friendId: string): void {
  if (!isFriend(user, friendId)) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "You are not friends.");
  }
}

function ensureNotFriend(user: UserSchemaType, friendId: string): void {
  if (isFriend(user, friendId)) {
    throw new ApiError(HTTP_STATUS.CONFLICT, "You are already friends.");
  }
}

function ensureRequestReceiver(
  request: FriendRequestSchemaType,
  userId: string,
): void {
  if (request.to.toString() !== userId) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, "Not authorized.");
  }
}

function ensureRequestSender(
  request: FriendRequestSchemaType,
  userId: string,
): void {
  if (request.from.toString() !== userId) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, "Not authorized.");
  }
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

async function ensurePendingRequest(requestId: string) {
  const request = await FriendRequest.findById(requestId);

  if (!request) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Friend request not found.");
  }

  if (request.status !== "pending") {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      "Friend request has already been handled.",
    );
  }

  return request;
}

async function getPendingRequest(user1: string, user2: string) {
  return FriendRequest.findOne({
    status: "pending",
    $or: [
      { from: user1, to: user2 },
      { from: user2, to: user1 },
    ],
  });
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
