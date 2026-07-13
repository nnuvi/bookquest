import express from "express";
import {
  borrowedBooks,
  getBorrowedBooks,
  getLentBooks,
  lentBooks,
} from "../controller/record.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/borrow", protectRoute, getBorrowedBooks);
router.get("/lend", protectRoute, getLentBooks);

export default router;
