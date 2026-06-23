import express from "express";
import {
    approveDeclineBorrowBook,
    borrowBookRequest
} from "../controller/request.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:profileUserId/:bookId/request", protectRoute, borrowBookRequest);

router.put("/request/decision", protectRoute, approveDeclineBorrowBook);

export default router;