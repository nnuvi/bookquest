import { z } from "zod";
import mongoose from "mongoose";

export const objectId = (field = "Object ID") =>
  z
    .string({
      error: `${field} is required.`,
    })
    .refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: `Invalid ${field}.`,
    });

export const objectIdParams = (paramName: string, field = "Object ID") =>
  z.object({
    params: z.object({
      [paramName]: objectId(field),
    }),
  });

export const userIdParams = (field = "User ID") =>
  objectIdParams("userId", field);

export const requestIdParams = (field = "Request ID") =>
  objectIdParams("requestId", field);

export const bookIdParams = (field = "Book ID") =>
  objectIdParams("bookId", field);

export const borrowRecordIdParams = (field = "Borrow Record ID") =>
  objectIdParams("borrowRecordId", field);

export const userBookIdParams = (field = "User Book ID") =>
  objectIdParams("userBookId", field);

export const messageField = z
  .string()
  .trim()
  .max(300, "Message cannot exceed 300 characters.")
  .optional()
  .default("");

export const responseMessageField = z
  .string()
  .trim()
  .max(300, "Response message cannot exceed 300 characters.")
  .optional()
  .default("");

export const borrowDurationDaysField = z
  .number()
  .int()
  .min(1, "Borrow duration must be at least 1 day.")
  .max(365, "Borrow duration cannot exceed 365 days.");
