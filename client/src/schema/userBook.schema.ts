import { z } from "zod";
import { bookFormSchema, BookFormValues } from "./book.schema";

export const userBookConditionEnum = ["new", "good", "fair", "poor"] as const;

export const inputMethodEnum = [
  "manual",
  "isbn",
  "barcode",
  "ocr",
  "ai",
] as const;

export const userBookFormSchema = z.object({
  condition: z.enum(userBookConditionEnum),

  notes: z.string().trim().optional(),

  inputSource: z.object({
    method: z.enum(inputMethodEnum),

    rawInput: z.string().optional(),

    confidence: z.number().min(0).max(1).optional(),
  }),
});

export type UserBookFormValues = z.infer<typeof userBookFormSchema>;


