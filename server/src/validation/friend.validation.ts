import { z } from "zod";
import { objectId, objectIdParams } from "./common.validation.js";
import { FriendRequestStatusEnum } from "../model/FriendRequest.model.js";

const FriendRequestActionValues = FriendRequestStatusEnum.filter(
  (status) => status !== "pending",
) as ["accepted", "declined"];

export const FriendRequestActionSchema = z.enum(FriendRequestActionValues);

// export const sendFriendRequestSchema = z.object({
//   params: z.object({
//     receiverId: objectId("Receiver ID"),
//   }),
// });

export const sendFriendRequestSchema = objectIdParams(
  "receiverId",
  "Receiver ID",
);

export const removeFriendSchema = objectIdParams("friendId", "Friend ID");

export const friendStatusSchema = objectIdParams("targetUserId", "Target User ID")

export const respondFriendRequestSchema = objectIdParams(
  "requestId",
  "Request ID",
).extend({
  body: z.object({
    action: FriendRequestActionSchema,
  }),
});

// export const respondFriendRequestSchema = z.object({
//   params: z.object({
//     requestId: objectId("Request ID"),
//   }),
//   body: z.object({
//     action: FriendRequestActionSchema,
//   }),
// });

// export const removeFriendSchema = z.object({
//   params: z.object({
//     friendId: objectId("Friend ID"),
//   }),
// });
