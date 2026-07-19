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
    condition: undefined,
    notes: "",
    inputSource: {
      method: "manual",
    },
  },
};

export function mapBookToForm(book: Book, isbn: string): AddBookFormData {
  return {
    book: {
      title: book.title,
      author: book.author,
      genres: book.genres,
      pageCount: book.pageCount,
      isbn: book.isbn,
      publisher: book.publisher,
      publishedDate: book.publishDate ? new Date(book.publishDate) : undefined,
      language: book.language,
      description: book.description,
      coverImage: book.coverImage ? { uri: book.coverImage } : undefined,
    },
    userBook: {
      condition: undefined,
      notes: "",
      inputSource: {
        method: "isbn",
        rawInput: isbn,
      },
    },
  };
}

// "imageLinks": {
//             "smallThumbnail": "http://books.google.com/books/content?id=fo4rzdaHDAwC&printsec=frontcover&img=1&zoom=5&source=gbs_api",
//             "thumbnail": "http://books.google.com/books/content?id=fo4rzdaHDAwC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
//           },
//           "language": "en",
//           "previewLink": "http://books.google.com/books?id=fo4rzdaHDAwC&dq=isbn:9780590353427&hl=&cd=2&source=gbs_api",
//           "infoLink": "http://books.google.com/books?id=fo4rzdaHDAwC&dq=isbn:9780590353427&hl=&source=gbs_api",
//           "canonicalVolumeLink": "https://books.google.com/books/about/Harry_Potter_and_the_Sorcerer_s_Stone.html?hl=&id=fo4rzdaHDAwC"
//         },