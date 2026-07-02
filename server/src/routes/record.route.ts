import express from "express";
import {
    borrowedBooks,
    lentBooks
} from "../controller/record.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/borrow", protectRoute, borrowedBooks);
router.get("/lend", protectRoute, lentBooks);

export default router;