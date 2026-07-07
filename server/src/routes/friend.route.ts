import express from "express";

import {
  getFriendRequests,
  respondFriendRequest,
  sendFriendRequest,
  removeFriend,
  getFriendStatus,
  cancelFriendRequest,
} from "../controller/friend.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import {
  sendFriendRequestSchema,
  respondFriendRequestSchema,
  removeFriendSchema,
  friendStatusSchema,
  cancelFriendRequestSchema,
} from "../validation/friend.validation.js";

const router = express.Router();

router.get("/request", protectRoute, getFriendRequests);

router.put(
  "/request/:receiverId",
  protectRoute,
  validate(sendFriendRequestSchema),
  sendFriendRequest,
);

router.patch(
  "/request/:requestId",
  protectRoute,
  validate(respondFriendRequestSchema),
  respondFriendRequest,
);

router.patch(
  "/request/:requestId/cancel",
  protectRoute,
  validate(cancelFriendRequestSchema),
  cancelFriendRequest,
);

router.get(
  "/status/:targetUserId",
  protectRoute,
  validate(friendStatusSchema),
  getFriendStatus,
);

router.delete(
  "/:friendId",
  protectRoute,
  validate(removeFriendSchema),
  removeFriend,
);

// router.post("/friend/:senderId/:receiverId", protectRoute, sendFriendRequest);
// router.post("/:profileUserId/:bookId/request", protectRoute, borrowBookRequest);

// router.put("/request/decision", protectRoute, approveDeclineBorrowBook);

export default router;
