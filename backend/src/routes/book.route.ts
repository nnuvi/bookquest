import express from "express";
import {
  getUserBookDetails,
  getMyBooks,
  getUserBooks,
  getBooks,
  getBookDetails,
} from "../controller/book.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getBooks);
router.get("/me", protectRoute, getMyBooks);
router.get("/details/user/:id", protectRoute, getUserBookDetails);
router.get("/details/:id", protectRoute, getBookDetails);
router.get("/:id", protectRoute, getUserBooks);

export default router;
