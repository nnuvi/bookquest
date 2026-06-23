import express from "express";
import {
    borrowedBooks,
    lentBooks
} from "../controller/history.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/borrowedBooks", protectRoute, borrowedBooks);
router.get("/lentBooks", protectRoute, lentBooks);

export default router;