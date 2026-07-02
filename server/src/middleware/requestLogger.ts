import { NextFunction, Request, Response } from "express";
import logger from "../config/logger.js";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const end = process.hrtime.bigint();

    const responseTime = Number(end - start) / 1_000_000; // ms

    logger.http({
      requestId: req.requestId,
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime: `${responseTime.toFixed(2)} ms`,
      ip: req.ip,
      userAgent: req.get("user-agent"),
      contentLength: res.getHeader("content-length") ?? 0,
    });
  });

  next();
};