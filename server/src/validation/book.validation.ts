import { z } from "zod";
import { bookIdParams, userBookIdParams } from "./common.validation.js";

const imageSchema = z.object({
  uri: z.string(),
  file: z.any().optional(),
  name: z.string().optional(),
  mimeType: z.string().optional(),
});

export const ISBNSchema = z.object({
  isbn: z
    .string()
    .trim()
    .min(10, "ISBN must be at least 10 digits")
    .max(13, "ISBN must be at most 13 digits")
    .regex(/^\d+$/, "ISBN must contain only numbers"),
});

export type ISBNInputData = z.infer<typeof ISBNSchema>;

export const BookInputSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),

  author: z
    .array(z.string().trim().min(1))
    .min(1, "At least one author is required"),

  genres: z.array(z.string().trim()),

  pageCount: z.number().int().min(0).optional(),

  isbn: z.string().trim().optional(),

  publisher: z.string().trim().optional(),

  publishDate: z.date().optional(),

  language: z.string().trim().optional(),

  description: z.string().trim().optional(),

  //   coverImage: imageSchema.optional(),
  coverImage: z.string().trim().optional(),
});

export type BookInputData = z.infer<typeof BookInputSchema>;

export const UserBookConditionEnum = ["new", "good", "fair", "poor"] as const;

export const InputMethodEnum = [
  "manual",
  "isbn",
  "barcode",
  "ocr",
  "ai",
] as const;

export const UserBookInputSchema = z.object({
  condition: z.enum(UserBookConditionEnum),

  notes: z.string().trim().optional(),

  inputSource: z.object({
    method: z.enum(InputMethodEnum),

    rawInput: z.string().optional(),

    confidence: z.number().min(0).max(1).optional(),
  }),
});

export type UserBookInputData = z.infer<typeof UserBookInputSchema>;

export const AddBookInputSchema = z.object({
  book: BookInputSchema,
  userBook: UserBookInputSchema,
});

export type AddBookInputData = z.infer<typeof AddBookInputSchema>;

// export const createBookSchema = z.object({
//   body: AddBookInputSchema,
// });

export const createBookByISBNScanSchema = bookIdParams(
  "Create Book By ISBN Scan Book ID",
).extend({
  body: UserBookInputSchema,
});

export const createBookManuallySchema = z.object({
  body: AddBookInputSchema,
});

export const isbnScanSchema = z.object({
  params: ISBNSchema,
});
