import { Request, Response } from "express";

import BorrowRecord from "../model/BorrowRecord.model.js";

import { asyncHandler } from "../lib/asyncHandler.js";
import { HTTP_STATUS } from "../constant/httpStatus.js";
import * as borrowRecordService from "../service/record.service.js";
import logger from "../config/logger.js";

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

    logger.debug("record borrowed: ", { borrowedBooks });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      count: borrowedBooks.length,
      data: borrowedBooks,
    });
  },
);

export const lentBooks = asyncHandler(async (req: Request, res: Response) => {
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

  logger.debug("record lent: ", { lentBooks });

  res.status(HTTP_STATUS.OK).json({
    success: true,
    count: lentBooks.length,
    data: lentBooks,
  });
});

export async function getBorrowedBooks(req: Request, res: Response) {
  const records = await borrowRecordService.getBorrowedBooks(req.user._id);

  res.json({
    success: true,
    data: records,
  });
}

export async function getLentBooks(req: Request, res: Response) {
  const records = await borrowRecordService.getLentBooks(req.user._id);

  res.json({
    success: true,
    data: records,
  });
}
