import express from "express";
import {
  getUserBookDetails,
  getMyBooks,
  getUserBooks,
} from "../controller/book.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", protectRoute, getMyBooks);
router.get("/details/:id", protectRoute, getUserBookDetails);
router.get("/:id", protectRoute, getUserBooks);

export default router;
