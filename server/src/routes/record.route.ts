import express from "express";
import {
  getBorrowedBooks,
  getBorrowRecord,
  getLentBooks
} from "../controller/record.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/borrow", protectRoute, getBorrowedBooks);
router.get("/lend", protectRoute, getLentBooks);
router.get("/:userBookId", protectRoute, getBorrowRecord);

export default router;
