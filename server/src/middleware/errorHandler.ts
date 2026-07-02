import { NextFunction, Request, Response } from "express";
import logger from "../config/logger.js";
import ApiError from "../lib/apiError.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode =
    err instanceof ApiError ? err.statusCode : 500;

  const message =
    err instanceof ApiError
      ? err.message
      : "Internal Server Error";

  logger.error({
    requestId: req.requestId,
    method: req.method,
    url: req.originalUrl,
    statusCode,
    message: err.message,
    stack: err.stack?.split("\n").slice(0, 5).join("\n"),
  });

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    requestId: req.requestId,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};