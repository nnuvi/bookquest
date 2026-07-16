import { z } from "zod";
import { bookFormSchema, BookFormValues } from "./book.schema";
import { userBookFormSchema } from "./userBook.schema";
import { Book } from "@/types/book";

export const AddBookSchema = z.object({
  book: bookFormSchema,
  userBook: userBookFormSchema,
});

export type AddBookFormData = z.infer<typeof AddBookSchema>;

export const addBookDefaultValues: AddBookFormData = {
  book: {
    title: "",
    author: [],
    genres: [],
    pageCount: undefined,
    isbn: "",
    publisher: "",
    publishedDate: undefined,
    language: "",
    description: "",
    coverImage: undefined,
  },
  userBook: {
    condition: "good",
    notes: "",
    inputSource: {
      method: "manual",
    },
  },
};

export function mapBookToForm(
  book: Book,
  isbn: string,
): AddBookFormData {
  return {
    book: {
      title: book.title,
      author: book.author,
      genres: book.genres,
      pageCount: book.pageCount,
      isbn: book.isbn,
      publisher: book.publisher,
      publishedDate: book.publishDate
        ? new Date(book.publishDate)
        : undefined,
      language: book.language,
      description: book.description,
      coverImage: book.coverImage
        ? { uri: book.coverImage }
        : undefined,
    },
    userBook: {
      condition: "good",
      notes: "",
      inputSource: {
        method: "isbn",
        rawInput: isbn,
      },
    },
  };
}