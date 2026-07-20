import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import logger from "../config/logger.js";
import ApiError from "../lib/ApiError.js";
import { HTTP_STATUS } from "../constant/httpStatus.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof ZodError) {
    logger.warn("Request validation failed", {
      requestId: req.requestId,
      method: req.method,
      url: req.originalUrl,
      statusCode: HTTP_STATUS.BAD_REQUEST,
      errors: err.issues,
    });

    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: "Validation failed.",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
      requestId: req.requestId,
    });

    return;
  }

  const statusCode =
    err instanceof ApiError
      ? err.statusCode
      : HTTP_STATUS.INTERNAL_SERVER_ERROR;

  const message =
    err instanceof ApiError ? err.message : "Internal Server Error";

  logger.error("Unhandled application error", {
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
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
};
