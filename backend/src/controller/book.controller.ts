import { Request, Response } from "express";
// import "../model/Book.model.js";
import Book, { BookSchemaType } from "../model/Book.model.js";
import UserBook, { UserBookSchemaType } from "../model/UserBook.model.js";
import User, { UserSchemaType } from "../model/user.model.js";

export const getMyBooks = async (req: Request, res: Response) => {
  const userId = req.user._id.toString();

  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ message: "User not Found" });

  const userBooks = await UserBook.find({ owner: userId }).populate<{
    book: BookSchemaType;
  }>("book");

  if (!userBooks) {
    return res.status(404).json({ message: "No books found" });
  }
  console.log(userBooks);
  res.status(200).json(userBooks);
};

export const getUserBooks = async (req: Request, res: Response) => {
  const profileUserId = req.params.id;

  const userBooks = await UserBook.find({ owner: profileUserId })
    .populate<{
      book: BookSchemaType;
    }>("book")
    .exec();

  if (!userBooks) {
    return res.status(404).json({ message: "No books found for this user." });
  }

  console.log(
    "Book Titles (user):",
    userBooks.map((b) => b.book.title),
  );

  res.status(200).json(userBooks);
};

export const getUserBookDetails = async (req: Request, res: Response) => {
  const bookId = req.params.id;
  console.log("bookid", bookId);

  const userBookDetails = await UserBook.findById(bookId)
    .populate<{
      book: BookSchemaType;
    }>("book")
    .populate<{
      User: UserSchemaType;
    }>("owner", "fullName username");
  console.log("get book details", userBookDetails);

  res.status(200).json(userBookDetails);
};

export const getBookDetails = async (req: Request, res: Response) => {
  const bookId = req.params.id;

  const bookDetails = await Book.findById(bookId);
  console.log("get book details", bookDetails);

  res.status(200).json(bookDetails);
};

export const getBooks = async (req: Request, res: Response) => {
  const { sort, genre, search, limit } = req.query;

  const query: any = {};

  // Search
  if (search) {
    query.$or = [
      { title: { $regex: search as string, $options: "i" } },
      { author: { $regex: search as string, $options: "i" } },
      { publisher: { $regex: search as string, $options: "i" } },
    ];
  }

  // Genre
  if (genre) {
    query.genres = genre;
  }

  let booksQuery = Book.find(query);

  // Sort
  if (sort === "latest") {
    booksQuery = booksQuery.sort({ createdAt: -1 });
  } else if (sort === "oldest") {
    booksQuery = booksQuery.sort({ createdAt: 1 });
  } else if (sort === "title") {
    booksQuery = booksQuery.sort({ title: 1 });
  }

  // Limit
  if (limit) {
    booksQuery = booksQuery.limit(Number(limit) || 5);
  }

  const books = await booksQuery.limit(5);
  console.log('search books', books)

  res.status(200).json(books);
};
