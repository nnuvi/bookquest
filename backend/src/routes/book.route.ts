import express from "express";
import {
  getBookDetails,
  getMyBooks,
  getUserBookList,
} from "../controller/book.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", protectRoute, getMyBooks);
router.get("/:id", protectRoute, getUserBookList);
router.get("/details/:id", protectRoute, getBookDetails);

export default router;
