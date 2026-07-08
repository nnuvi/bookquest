import express from "express";

import {
  sendRecallRequest,
  getRecallRequests,
  getRecallSentRequests,
  respondToRecallRequest,
  cancelRecallRequest,
} from "../controller/recall.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import {
  sendRecallRequestSchema,
  respondRecallRequestSchema,
  cancelRecallRequestSchema,
} from "../validation/recall.validation.js";

const router = express.Router();

// Send a recall request
router.post(
  "/:borrowRecordId/request",
  protectRoute,
  validate(sendRecallRequestSchema),
  sendRecallRequest,
);

// Incoming recall requests (borrower)
router.get(
  "/request",
  protectRoute,
  getRecallRequests,
);

// Sent recall requests (owner)
router.get(
  "/request/sent",
  protectRoute,
  getRecallSentRequests,
);

// Accept / Decline
router.patch(
  "/request/:requestId/respond",
  protectRoute,
  validate(respondRecallRequestSchema),
  respondToRecallRequest,
);

// Cancel own request
router.delete(
  "/request/:requestId",
  protectRoute,
  validate(cancelRecallRequestSchema),
  cancelRecallRequest,
);

export default router;