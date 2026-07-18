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
  createBookManually,
} from "@/controller/book.controller.js";
import { protectRoute } from "@/middleware/auth.middleware.js";
import {
  createBookByISBNScanSchema,
  createBookManuallySchema,
  isbnScanSchema,
} from "@/validation/book.validation.js";
import { validate } from "@/middleware/validate.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getBooks);
router.get("/search", protectRoute, searchBooks);
router.get("/me", protectRoute, getMyBooks);
router.get("/isbn/:isbn", protectRoute, validate(isbnScanSchema), isbnScan);
router.post(
  "/manual",
  protectRoute,
  validate(createBookManuallySchema),
  createBookManually,
);
router.post(
  "/:bookId",
  protectRoute,
  validate(createBookByISBNScanSchema),
  createBookByISBNScan,
);
router.get("/details/user/:id", protectRoute, getUserBookDetails);
router.get("/details/:id", protectRoute, getBookDetails);
router.get("/:id", protectRoute, getUserBooks);

export default router;
