import express from "express";

import {
  sendBorrowRequest,
  getBorrowRequests,
  getSentBorrowRequests,
  respondToBorrowRequest,
  cancelBorrowRequest,
  getBorrowStatus,
} from "../controller/borrow.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import {
  sendBorrowRequestSchema,
  respondBorrowRequestSchema,
  cancelBorrowRequestSchema,
  borrowStatusSchema,
} from "../validation/borrow.validation.js";

const router = express.Router();

// Send a borrow request
router.post(
  "/:bookId/request",
  protectRoute,
  validate(sendBorrowRequestSchema),
  sendBorrowRequest,
);

// Incoming borrow requests (owner)
router.get(
  "/request",
  protectRoute,
  getBorrowRequests,
);

// Sent borrow requests (requester)
router.get(
  "/request/sent",
  protectRoute,
  getSentBorrowRequests,
);

// Accept / Decline a borrow request
router.patch(
  "/request/:requestId/respond",
  protectRoute,
  validate(respondBorrowRequestSchema),
  respondToBorrowRequest,
);

// Cancel a borrow request
router.delete(
  "/request/:requestId",
  protectRoute,
  validate(cancelBorrowRequestSchema),
  cancelBorrowRequest,
);

// Get borrow status for a book
router.get(
  "/:bookId/status",
  protectRoute,
  validate(borrowStatusSchema),
  getBorrowStatus,
);

export default router;