import { Request, Response } from "express";

import BorrowRecord from "../model/BorrowRecord.model.js";

import { asyncHandler } from "../lib/asyncHandler.js";
import { HTTP_STATUS } from "../constant/httpStatus.js";

export const borrowedBooks = asyncHandler(
  async (req: Request, res: Response) => {
    const borrowedBooks = await BorrowRecord.find({
      borrower: req.user._id,
    })
      .populate({
        path: "userBook",
        populate: {
          path: "book",
        },
      })
      .populate("owner", "username fullName profileImg")
      .populate("borrower", "username fullName profileImg")
      .exec();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      count: borrowedBooks.length,
      data: borrowedBooks,
    });
  }
);

export const lentBooks = asyncHandler(
  async (req: Request, res: Response) => {
    const lentBooks = await BorrowRecord.find({
      owner: req.user._id,
    })
      .populate({
        path: "userBook",
        populate: {
          path: "book",
        },
      })
      .populate("owner", "username fullName profileImg")
      .populate("borrower", "username fullName profileImg")
      .exec();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      count: lentBooks.length,
      data: lentBooks,
    });
  }
);