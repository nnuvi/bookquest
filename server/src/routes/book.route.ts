import express from "express";
import {
  getUserBookDetails,
  getMyBooks,
  getUserBooks,
  getBooks,
  getBookDetails,
  searchBooks,
  isbnScan,
  createBookByISBNScan,
} from "@/controller/book.controller.js";
import { protectRoute } from "@/middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getBooks);
router.get("/search", protectRoute, searchBooks);
router.get("/me", protectRoute, getMyBooks);
router.get("/isbn/:isbn", protectRoute, isbnScan)
router.post("/:bookId", protectRoute, createBookByISBNScan)
router.get("/details/user/:id", protectRoute, getUserBookDetails);
router.get("/details/:id", protectRoute, getBookDetails);
router.get("/:id", protectRoute, getUserBooks);

export default router;
