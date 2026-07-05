import express from "express";

import {
  getBorrowRequests,
  getBorrowSentRequests,
} from "../controller/borrow.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

router.get("/request", protectRoute, getBorrowRequests);

router.get("/request/sent", protectRoute, getBorrowSentRequests);

// router.post("/Borrow/:senderId/:receiverId", protectRoute, sendBorrowRequest);
// router.post("/:profileUserId/:bookId/request", protectRoute, borrowBookRequest);

// router.put("/request/decision", protectRoute, approveDeclineBorrowBook);

export default router;
