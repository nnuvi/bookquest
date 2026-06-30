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
  const { sort, genre, search, limit } = req.query;

  const query: FilterQuery<BookSchemaType> = {};

  // Search
  if (typeof search === "string" && search.trim()) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { author: { $regex: search, $options: "i" } },
      { publisher: { $regex: search, $options: "i" } },
    ];
  }

  // Genre
  if (typeof genre === "string" && genre.trim()) {
    query.genres = genre;
  }

  let booksQuery = Book.find(query);

  // Sort
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
  }

  // Limit (default = 5)
  const pageLimit = typeof limit === "string" ? Number(limit) || 5 : 5;

  booksQuery = booksQuery.limit(pageLimit);

  const books = await booksQuery.exec();

  res.status(HTTP_STATUS.OK).json({
    success: true,
    count: books.length,
    data: books,
  });
});
