import type { Request, Response } from "express";
import { asyncHandler } from "../lib/asyncHandler.js";
import * as notificationService from "../service/notification.service.js";
import { HTTP_STATUS } from "../constant/httpStatus.js";

export const getNotifications = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await notificationService.getNotifications(
      req.user._id.toString()
    );

    res.status(HTTP_STATUS.OK).json(data);
  }
);

