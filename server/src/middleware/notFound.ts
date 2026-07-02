import { NextFunction, Request, Response } from "express";
import ApiError from "../lib/apiError.js";

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  next(
    new ApiError(
      404,
      `Route '${req.originalUrl}' not found`
    )
  );
};