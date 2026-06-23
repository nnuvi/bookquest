import { Request, Response } from "express";
import { BookSchemaType } from "../model/Book.model.js";
import User from "../model/user.model.js";


export const borrowedBooks = async (req: Request, res: Response) => {
  const userId = req.user._id.toString();
  //console.log( req.user );
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ message: "User not Found" });

  const getUserBookList = await User.findById(userId)
    .select("bookCollection")
    .populate<{ bookCollection: BookSchemaType[] }>("bookCollection")
    .exec();

  if (!getUserBookList) {
    return res.status(404).json({ message: "User not found" });
  }

  const borrowedBookList = getUserBookList.bookCollection.filter(
    (book) => book.bookType === "borrowedBook",
  );
  const bookTitles = borrowedBookList.map((book) => book.title);
  console.log("bookTitles", bookTitles);

  res.status(200).json(borrowedBookList);
};

export const lentBooks = async (req: Request, res: Response) => {
  const userId = req.user._id.toString();
  //console.log( req.user );
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ message: "User not Found" });

  const getUserBookList = await User.findById(userId)
    .select("bookCollection")
    .populate<{ bookCollection: BookSchemaType[] }>("bookCollection")
    .exec();

  if (!getUserBookList) {
    return res.status(404).json({ message: "User not found" });
  }
  console.log("Populated lent bookCollection");

  const lentBookList = getUserBookList.bookCollection.filter(
    (book) => book.bookType === "lentBook",
  );
  const bookTitles = lentBookList.map((book) => book.title);
  console.log("bookTitles", bookTitles);

  res.status(200).json(lentBookList);
};