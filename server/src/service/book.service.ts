import {
  CreateBookDto,
  CreateUserBookDto,
  mapGoogleBook,
} from "@/types/book.js";
import { HTTP_STATUS } from "../constant/httpStatus.js";
import ApiError from "../lib/apiError.js";
import Book, { BookSchemaType } from "../model/Book.model.js";
import UserBook, {
  UserBookSchemaType,
  UserBookAvailability,
} from "../model/UserBook.model.js";
import { getGoogleBookByISBN } from "./external.service.js";
import logger from "@/config/logger.js";
import { FilterQuery } from "mongoose";

// userbook exists
// ensure book availablity (case)
// ensure book availablity not (case)
// ensure book owner
// ensure not bookowner
// update book avalibilty

export async function getBookDataByISBN(isbn: string, userId: string) {
  logger.debug("UserId and ISBN: ", {
    userId,
    isbn,
  });

  await ensureNotDuplicateBook(userId, { isbn });

  const existing = await getBookByISBN(isbn);

  logger.debug("Exists Book:? ", { existing });

  if (existing) {
    await ensureNotDuplicateBook(userId, { bookId: existing?._id.toString() });
    return existing;
  }

  const googleResponse = await getGoogleBookByISBN(isbn);

  if (!googleResponse.items?.length) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Book not found.");
  }

  const bookData = mapGoogleBook(googleResponse.items[0], isbn);

  logger.debug("Google Books API Book: ", { bookData });

  const book = createBook(bookData);

  return book;
}

export async function createBookByISBNScan(
  userId: string,
  bookId: string,
  data: CreateUserBookDto,
): Promise<UserBookSchemaType> {
  logger.debug("Create UserBook Data: ", { data });
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
  },
) {
  const query: FilterQuery<typeof UserBook> = {
    owner: userId,
  };

  if (options.bookId) {
    query.book = options.bookId;
  } else if (options.isbn) {
    query.isbn = options.isbn;
  } else {
    throw new Error("Either bookId or isbn must be provided.");
  }

  const exists = await UserBook.exists(query);
  logger.debug("Duplicate book Exists: ", { exists });
  if (exists) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "You already own this book in your library",
    );
  }
}
