import { Request, Response } from "express";
import { asyncHandler } from "../lib/asyncHandler.js";
import { HTTP_STATUS } from "../constant/httpStatus.js";

import * as returnService from "../service/return.service.js";
import logger from "../config/logger.js";

export const sendReturnRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const { borrowRecordId } = req.params;
    const { message } = req.body;

    logger.debug("Send return req: ", {
      borrowRecordId,
      message
    })

    const result = await returnService.sendReturnRequest(
      req.user._id,
      borrowRecordId!,
      message,
    );

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "Return request sent successfully.",
      data: result,
    });
  },
);

export const getReturnRequests = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await returnService.getReturnRequests(req.user._id);

    res.status(HTTP_STATUS.OK).json(result);
  },
);

export const getReturnSentRequests = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await returnService.getReturnSentRequests(req.user._id);

    res.status(HTTP_STATUS.OK).json(result);
  },
);

export const respondToReturnRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const { requestId } = req.params;
    const { status } = req.body;

    const result = await returnService.respondReturnRequest(
      requestId!,
      req.user._id,
      status,
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: `Return request ${status}.`,
      data: result,
    });
  },
);

export const cancelReturnRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const { requestId } = req.params;

    const result = await returnService.cancelReturnRequest(
      requestId!,
      req.user._id,
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Return request cancelled.",
      data: result,
    });
  },
);

export const sendReturnReminder = asyncHandler(
  async (req: Request, res: Response) => {
    const { borrowRecordId } = req.params;

    logger.debug("borrorecordId remind: ", borrowRecordId)

    const result = await returnService.sendReturnReminder(
      req.user._id,
      borrowRecordId!,
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Return reminder sent successfully.",
      data: result,
    });
  },
);
