import { Request, Response } from "express";
import Books, { BookSchemaType } from "../model/Book.model.js";
import UserBook, { UserBookSchemaType } from "../model/UserBook.model.js";
import User from "../model/user.model.js";
import Book from "../model/Book.model.js";

//import { preprocessImage } from "../lib/util/preProcessImage.js";

export const getMyBooks = async (req: Request, res: Response) => {
  const userId = req.user._id.toString();
  //console.log( req.user );
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ message: "User not Found" });

  const userBooks = await UserBook.find({ owner: userId }).populate<{
    book: BookSchemaType;
  }>("book");

  if (!userBooks) {
    return res.status(404).json({ message: "No books found" });
  }
  console.log(userBooks)
  res.status(200).json(userBooks);
};

export const getUserBookList = async (req: Request, res: Response) => {
  const profileUserId = req.params.id;

  const userBooks = await UserBook.find({ owner:profileUserId })
    .populate<{
      book: BookSchemaType;
    }>("book")
    .exec();

  if (!userBooks) {
    return res.status(404).json({ message: "No books found for this user." });
  }

  console.log("Book Titles (user):", userBooks.map((b) => b.book.title));

  res.status(200).json(userBooks);
};

export const getBookDetails = async (req: Request, res: Response) => {
  const bookId = req.params.id;

  const bookDetails = await Book.findById(bookId);
  console.log("get book details", bookDetails);
  console.log(JSON.stringify(bookDetails, null, 2));

  res.status(200).json(bookDetails);
};
