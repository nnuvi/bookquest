import express from "express";

import {
  sendReturnRequest,
  getReturnRequests,
  getReturnSentRequests,
  respondToReturnRequest,
  cancelReturnRequest,
  sendReturnReminder
} from "../controller/return.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import {
  sendReturnRequestSchema,
  respondReturnRequestSchema,
  cancelReturnRequestSchema,
  sendReturnReminderSchema
} from "../validation/return.validation.js";

const router = express.Router();

// Send a return request
router.post(
  "/:borrowRecordId/request",
  protectRoute,
  validate(sendReturnRequestSchema),
  sendReturnRequest,
);

// Incoming return requests (owner)
router.get(
  "/request",
  protectRoute,
  getReturnRequests,
);

// Sent return requests (borrower)
router.get(
  "/request/sent",
  protectRoute,
  getReturnSentRequests,
);

// Accept / Decline
router.patch(
  "/request/:requestId/respond",
  protectRoute,
  validate(respondReturnRequestSchema),
  respondToReturnRequest,
);

// Cancel own request
router.delete(
  "/request/:requestId",
  protectRoute,
  validate(cancelReturnRequestSchema),
  cancelReturnRequest,
);

router.post(
  "/:borrowRecordId/remind",
  protectRoute,
  validate(sendReturnReminderSchema),
  sendReturnReminder,
);

export default router;