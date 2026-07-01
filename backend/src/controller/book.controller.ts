import { Request, Response } from "express";

import Book, { BookSchemaType } from "../model/Book.model.js";
import UserBook from "../model/UserBook.model.js";

import ApiError from "../lib/apiError.js";
import { asyncHandler } from "../lib/asyncHandler.js";
import { HTTP_STATUS } from "../constant/httpStatus.js";

import { FilterQuery } from "mongoose";

export const getMyBooks = asyncHandler(async (req: Request, res: Response) => {
  const userBooks = await UserBook.find({
    owner: req.user._id,
  }).populate<{
    book: BookSchemaType;
  }>("book");

  res.status(HTTP_STATUS.OK).json({
    success: true,
    data: userBooks,
  });
});

export const getUserBooks = asyncHandler(
  async (req: Request, res: Response) => {
    const userBooks = await UserBook.find({
      owner: req.params.id,
    }).populate<{
      book: BookSchemaType;
    }>("book");

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: userBooks,
    });
  },
);

export const getUserBookDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const userBook = await UserBook.findById(req.params.id)
      .populate<{
        book: BookSchemaType;
      }>("book")
      .populate("owner", "fullName username");

    if (!userBook) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "User book not found.");
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: userBook,
    });
  },
);

export const getBookDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Book not found.");
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: book,
    });
  },
);

export const getBooks = asyncHandler(async (req: Request, res: Response) => {
  const { sort, genre, limit } = req.query;

  const filter: FilterQuery<BookSchemaType> = {};

  // Filter by genre
  if (typeof genre === "string" && genre.trim()) {
    filter.genres = genre.trim();
  }

  const pageLimit =
    typeof limit === "string" ? Math.max(1, Number(limit) || 5) : 5;

  let booksQuery = Book.find(filter);

  switch (sort) {
    case "latest":
      booksQuery = booksQuery.sort({ createdAt: -1 });
      break;

    case "oldest":
      booksQuery = booksQuery.sort({ createdAt: 1 });
      break;

    case "title":
      booksQuery = booksQuery.sort({ title: 1 });
      break;

    default:
      booksQuery = booksQuery.sort({ createdAt: -1 });
  }

  const books = await booksQuery.limit(pageLimit).lean();

  res.status(HTTP_STATUS.OK).json({
    success: true,
    count: books.length,
    data: books,
  });
});

export const searchBooks = asyncHandler(async (req: Request, res: Response) => {
  const { query, genre, sort, limit } = req.query;

  const filter: FilterQuery<BookSchemaType> = {};

  // Keyword search
  if (typeof query === "string" && query.trim().length >= 2) {
    const keyword = query.trim();

    filter.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { author: { $regex: keyword, $options: "i" } },
      { publisher: { $regex: keyword, $options: "i" } },
      { isbn: { $regex: keyword } }, 
    ];
  }

  // Genre filter
  if (typeof genre === "string" && genre.trim()) {
    filter.genres = genre.trim();
  }

  const pageLimit =
    typeof limit === "string"
      ? Math.max(1, Number(limit) || 20)
      : 20;

  let booksQuery = Book.find(filter);

  switch (sort) {
    case "latest":
      booksQuery = booksQuery.sort({ createdAt: -1 });
      break;

    case "oldest":
      booksQuery = booksQuery.sort({ createdAt: 1 });
      break;

    case "title":
      booksQuery = booksQuery.sort({ title: 1 });
      break;

    default:
      booksQuery = booksQuery.sort({ title: 1 });
  }

  const books = await booksQuery.limit(pageLimit).lean();

  res.status(HTTP_STATUS.OK).json({
    success: true,
    count: books.length,
    data: books,
  });
});
