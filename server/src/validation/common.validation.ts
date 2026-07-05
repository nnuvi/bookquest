import { z } from "zod";
import mongoose from "mongoose";

export const objectId = (field = "ObjectId") =>
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
