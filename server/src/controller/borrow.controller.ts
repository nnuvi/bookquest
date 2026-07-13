import { Request, Response } from "express";

import { HTTP_STATUS } from "../constant/httpStatus.js";
import { asyncHandler } from "../lib/asyncHandler.js";
// import { FriendRequestAction } from "../model/FriendRequest.model.js";
import * as friendService from "../service/friend.service.js";
import * as borrowService from "../service/borrow.service.js";
import logger from "../config/logger.js";
import { success } from "zod";

export const getBorrowRequests = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await borrowService.getBorrowRequests(req.user._id.toString());

    res.status(HTTP_STATUS.OK).json(data);
  },
);

export const getSentBorrowRequests = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await borrowService.getSentBorrowRequests(req.user._id);

    res.status(HTTP_STATUS.OK).json(data);
  },
);

export const getBorrowRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const { requestId } = req.params;
    const data = await borrowService.getBorrowRequestDetails(requestId!);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Request Fetched Successfully",
      data,
    });
  },
);

export const sendBorrowRequest = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { userBookId } = req.params;
    const { borrowDurationDays, message } = req.body;

    const data = await borrowService.sendBorrowRequest(
      req.user._id,
      userBookId!,
      borrowDurationDays,
      message,
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Successfully",
      data,
    });
  },
);

export const respondToBorrowRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const { requestId } = req.params;
    const { status } = req.body;

    const result = await borrowService.respondBorrowRequest(
      requestId!,
      req.user._id,
      status,
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: `Borrow request ${status}.`,
      data: result,
    });
  },
);

export const cancelBorrowRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const { requestId } = req.params;

    const result = await borrowService.cancelBorrowRequest(
      requestId!,
      req.user._id,
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Borrow request cancelled.",
      data: result,
    });
  },
);

export const getBorrowStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { userBookId } = req.params;
    logger.debug(`Status UserBookID ${userBookId}`);
    const result = await borrowService.getBorrowStatus(
      req.user._id,
      userBookId!,
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result,
    });
  },
);
