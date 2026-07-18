import { BookSchemaType } from "@/model/Book.model.js";
import { UserBookSchemaType } from "@/model/UserBook.model.js";
import { CreateBookDto, GoogleBook } from "@/types/book.js";
import { AddBookInputData } from "@/validation/book.validation.js";

export function mapGoogleBook(book: GoogleBook, isbn: string): CreateBookDto {
  const info = book.volumeInfo;

  const extractedISBN =
    info.industryIdentifiers?.find(({ type }) => type === "ISBN_13")
      ?.identifier ??
    info.industryIdentifiers?.find(({ type }) => type === "ISBN_10")
      ?.identifier;

  const dto: CreateBookDto = {
    title: info.title ?? "",
    author: info.authors ?? [],
    genres: info.categories ?? [],
    pageCount: info.pageCount ?? 0,
    isbn: extractedISBN ?? isbn,
    publisher: info.publisher ?? "",
    description: info.description ?? "",
    coverImage:
      info.imageLinks?.large ??
      info.imageLinks?.medium ??
      info.imageLinks?.thumbnail ??
      "",
    language: info.language ?? "",
  };

  const publishDate = parsePublishedDate(info.publishedDate);

  if (publishDate) {
    dto.publishDate = publishDate;
  }

  return dto;
}

function parsePublishedDate(date?: string): Date | undefined {
  if (!date) return undefined;

  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

// export function mapAddBookInputToBook(
//   data: AddBookInputData,
// ): Partial<BookSchemaType> {
//   return {
//     title: data.book.title,
//     author: data.book.author,
//     genres: data.book.genres,
//     pageCount: data.book.pageCount,
//     isbn: data.book.isbn,
//     publisher: data.book.publisher,
//     publishDate: data.book.publishDate,
//     language: data.book.language,
//     description: data.book.description,
//     coverImage: data.book.coverImage,
//   };
// }

export function mapAddBookInputToUserBook(
  userId: string,
  bookId: string,
  input: AddBookInputData,
) {
  return {
    owner: userId,
    book: bookId,
    ...input.userBook,
  };
}
