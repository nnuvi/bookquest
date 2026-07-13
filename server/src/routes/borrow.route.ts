import express from "express";

import {
  sendBorrowRequest,
  getBorrowRequests,
  getSentBorrowRequests,
  respondToBorrowRequest,
  cancelBorrowRequest,
  getBorrowStatus,
  getBorrowRequest,
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
  "/:userBookId/request",
  protectRoute,
  validate(sendBorrowRequestSchema),
  sendBorrowRequest,
);



// Incoming borrow requests (owner)
router.get("/request", protectRoute, getBorrowRequests);

// Sent borrow requests (requester)
router.get("/request/sent", protectRoute, getSentBorrowRequests);

// Incoming borrow request (owner)
router.get("/request/:requestId", protectRoute, getBorrowRequest);

// Accept / Decline a borrow request
router.patch(
  "/request/:requestId/respond",
  protectRoute,
  validate(respondBorrowRequestSchema),
  respondToBorrowRequest,
);

// Cancel a borrow request
router.patch(
  "/request/:requestId/cancel",
  protectRoute,
  validate(cancelBorrowRequestSchema),
  cancelBorrowRequest,
);

// Get borrow status for a book
router.get(
  "/:userBookId/status",
  protectRoute,
  validate(borrowStatusSchema),
  getBorrowStatus,
);

export default router;
