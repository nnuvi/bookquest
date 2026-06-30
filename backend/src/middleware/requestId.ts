import { randomUUID } from "node:crypto";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      requestId: string;
    }
  }
}

export const requestId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = randomUUID();

  req.requestId = id;

  res.setHeader("X-Request-Id", id);

  next();
};