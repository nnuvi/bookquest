import { Request, Response } from "express";
import { BookSchemaType } from "../model/Book.model.js";
import User from "../model/user.model.js";
import UserBook, { UserBookSchemaType } from "../model/UserBook.model.js";
import BorrowRecord from "../model/BorrowRecord.model.js";

export const borrowedBooks = async (req: Request, res: Response) => {
  const userId = req.user._id.toString();

  const borrowedBooks = await BorrowRecord.find({
    borrower: userId,
  })
    .populate({
      path: "userBook",
      populate: {
        path: "book",
      },
    })
    .populate("owner", "username fullName profileImg")
    .populate("borrower", "username fullName profileImg");

  if (!borrowedBooks) {
    return res.status(404).json({ message: "No Book Found" });
  }

  console.log("bookTitles", borrowedBooks);

  res.status(200).json(borrowedBooks);
};

export const lentBooks = async (req: Request, res: Response) => {
  const userId = req.user._id.toString();

  const lentBooks = await BorrowRecord.find({
    owner: userId,
  })
    .populate({
      path: "userBook",
      populate: {
        path: "book",
      },
    })
    .populate("owner", "username fullName profileImg")
    .populate("borrower", "username fullName profileImg");

  if (!lentBooks) {
    return res.status(404).json({ message: "No Book Found" });
  }

  console.log("bookTitles", lentBooks);

  res.status(200).json(lentBooks);
};
