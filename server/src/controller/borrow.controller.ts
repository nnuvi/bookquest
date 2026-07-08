import { Request, Response } from "express";

import { HTTP_STATUS } from "../constant/httpStatus.js";
import { asyncHandler } from "../lib/asyncHandler.js";
// import { FriendRequestAction } from "../model/FriendRequest.model.js";
import * as friendService from "../service/friend.service.js";
import * as borrowService from "../service/borrow.service.js";

export const getBorrowRequests = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await borrowService.getBorrowRequests(req.user._id.toString());

    res.status(HTTP_STATUS.OK).json(data);
  },
);

export const getSentBorrowRequests = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await borrowService.getSentBorrowRequests(
      req.user._id.toString(),
    );

    res.status(HTTP_STATUS.OK).json(data);
  },
);

export const sendBorrowRequest = asyncHandler( 
  async (req: Request, res: Response): Promise<void> => {
    const { bookId } = req.params;
    const data = await borrowService.getBorrowRequests
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: " Successfully",
      data
    });
  }
);

export const respondToBorrowRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const { requestId } = req.params;
    const { action } = req.body;

    const result = await borrowService.respondBorrowRequest(
      requestId!,
      req.user.id,
      action,
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: `Borrow request ${action}.`,
      data: result,
    });
  },
);

export const cancelBorrowRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const { requestId } = req.params;

    const result = await borrowService.cancelBorrowRequest(
      requestId!,
      req.user.id
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

    const result = await borrowService.getBorrowStatus(
      req.user.id,
      userBookId!,
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: result,
    });
  },
);