import { z } from "zod";

const imageSchema = z.object({
  uri: z.string(),
  file: z.any().optional(),
  name: z.string().optional(),
  mimeType: z.string().optional(),
});

export const bookFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),

  author: z
    .array(z.string().trim().min(1))
    .min(1, "At least one author is required"),

  genres: z.array(z.string().trim()),

  pageCount: z.number().int().min(0).optional(),

  isbn: z.string().trim().optional(),

  publisher: z.string().trim().optional(),

  publishedDate: z.date().optional(),

  language: z.string().trim().optional(),

  description: z.string().trim().optional(),

  coverImage: imageSchema.optional(),
});

export type BookFormValues = z.infer<typeof bookFormSchema>;
