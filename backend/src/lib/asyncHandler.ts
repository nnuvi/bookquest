import { NextFunction, Request, Response, RequestHandler } from "express";

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const asyncHandler = (
  controller: AsyncController
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(controller(req, res, next)).catch(next);
  };
};