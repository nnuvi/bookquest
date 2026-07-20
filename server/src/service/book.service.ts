import { CreateBookDto, CreateUserBookDto } from "@/types/book.js";
import { HTTP_STATUS } from "../constant/httpStatus.js";
import ApiError from "../lib/ApiError.js";
import Book, { BookSchemaType } from "../model/Book.model.js";
import UserBook, {
  UserBookSchemaType,
  UserBookAvailability,
} from "../model/UserBook.model.js";
import {
  getGoogleBookByISBN,
  selectBestGoogleBook,
} from "./external.service.js";
import logger from "@/config/logger.js";
import { FilterQuery } from "mongoose";
import { AddBookInputData } from "@/validation/book.validation.js";
import {
  mapAddBookInputToUserBook,
  mapGoogleBook,
} from "@/mapper/book.mapper.js";
import { title } from "process";

// userbook exists
// ensure book availablity (case)
// ensure book availablity not (case)
// ensure book owner
// ensure not bookowner
// update book avalibilty

export async function getBookDataByISBN(isbn: string, userId: string) {
  // logger.debug("UserId and ISBN: ", {
  //   userId,
  //   isbn,
  // });
  // logger.debug("UserId of book adder:? ", { userId, isbn });

  // <<<<<<<<<<<<<<<<<<<< User Doesnt Have the book with same isbn >>>>>>>>>>>>>>>>>>>> //

  await ensureNotDuplicateBook(userId, { isbn });

  // <<<<<<<<<<<<<<<<<<<< Get Book with the ISBN >>>>>>>>>>>>>>>>>>>> //

  const existing = await getBookByISBN(isbn);

  // logger.debug("Exists Book:? ", { existing });

  if (existing) {
    // await ensureNotDuplicateBook(userId, { bookId: existing?._id.toString() });
    return existing;
  }

  const googleResponse = await getGoogleBookByISBN(isbn);

  if (!googleResponse.items?.length) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Book not found.");
  }

  // const bookData = mapGoogleBook(googleResponse.items[0], isbn);

  const bestBook = selectBestGoogleBook(googleResponse.items, isbn);

  const bookData = mapGoogleBook(bestBook, isbn);

  const book = createBook(bookData);

  return book;
}

export async function createBookByISBNScan(
  userId: string,
  bookId: string,
  data: CreateUserBookDto,
): Promise<UserBookSchemaType> {
  await ensureNotDuplicateBook(userId, { bookId });

  // Create the user's copy
  const userBook = await UserBook.create({
    owner: userId,
    book: bookId,

    condition: data.condition ?? "good",
    notes: data.notes ?? "",

    inputSource: {
      method: data.inputSource?.method ?? "isbn",
      rawInput: data.inputSource?.rawInput ?? "",
      confidence: data.inputSource?.confidence ?? 1,
    },
  });

  return userBook.populate("book");
}

export async function createBookManually(
  userId: string,
  addBookData: AddBookInputData,
) {
  let book = null;

  // Try to find an existing Book
  if (addBookData.book.isbn) {
    book = await Book.findOne({ isbn: addBookData.book.isbn });
  } else {
    book = await Book.findOne({
      title: addBookData.book.title,
      author: addBookData.book.author,
    });
  }

  if (!book) {
    book = await Book.create(addBookData.book);
  }

  await ensureNotDuplicateBook(userId, {
    bookId: book._id.toString(),
  });

  const userBook = await UserBook.create(
    mapAddBookInputToUserBook(userId, book._id.toString(), addBookData),
  );

  return userBook;
}

export async function getBookByIdOrThrow(bookId: string) {
  const book = await Book.findById(bookId);

  if (!book) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Book not found.");
  }

  return book;
}

export async function getBookByISBNOrThrow(isbn: string) {
  const book = await Book.findOne({ isbn });

  if (!book) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Book not found.");
  }

  return book;
}

export async function getUserBookOrThrow(userBookId: string) {
  const userBook = await UserBook.findById(userBookId);
  if (!userBook) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Book not found.");
  }
  return userBook;
}

export function ensureBookAvailability(
  userBook: UserBookSchemaType,
  availability: UserBookAvailability,
): void {
  if (userBook.availability !== availability) {
    throw new ApiError(HTTP_STATUS.CONFLICT, `Book must be ${availability}.`);
  }
}

export function ensureBookNotAvailability(
  userBook: UserBookSchemaType,
  availability: UserBookAvailability,
) {
  if (userBook.availability === availability) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      `Book must not be ${availability}.`,
    );
  }
}

export function ensureBookOwner(
  userBook: UserBookSchemaType,
  userId: string,
): void {
  if (userBook.owner.toString() !== userId) {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      "You are not the owner of this book.",
    );
  }
}

export function ensureNotBookOwner(
  userBook: UserBookSchemaType,
  userId: string,
): void {
  if (userBook.owner.toString() === userId) {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      "You are the owner of this book.",
    );
  }
}

export async function updateBookAvailability(
  userBookId: string,
  availability: UserBookAvailability,
): Promise<void> {
  const userBook = await getUserBookOrThrow(userBookId);
  userBook.availability = availability;
  await userBook.save();
}

export async function getBookByISBN(isbn: string) {
  return Book.findOne({ isbn }).lean();
}

export async function createBook(book: CreateBookDto): Promise<BookSchemaType> {
  return Book.create(book);
}

export async function ensureNotDuplicateBook(
  userId: string,
  options: {
    bookId?: string;
    isbn?: string;
    title?: string;
    author?: string[];
  },
) {
  let bookId = options.bookId;

  // logger.debug("Duplicate find bookid: ", { bookId });

  if (!bookId && options.isbn) {
    const book = await Book.findOne({ isbn: options.isbn }).select("_id");
    // logger.debug("Book ID of ISBN SCAN: ", { book });
    bookId = book?._id.toString();
  }

  if (!bookId && options.title && options.author?.length) {
    const book = await Book.findOne({
      title: options.title,
      author: options.author,
    }).select("_id");

    bookId = book?._id.toString();
  }

  if (!bookId) {
    // No existing Book found, so there can't be a duplicate UserBook.
    return;
  }

  const exists = await UserBook.exists({
    owner: userId,
    book: bookId,
  });

  logger.debug("Duplicate book Exists:", { exists });

  if (exists) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "You already own this book in your library",
    );
  }
}
