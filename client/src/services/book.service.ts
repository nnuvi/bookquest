import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { mapBook, mapBorrowRecord, mapUserBook } from "./book.mapper";
import { BorrowRecord } from "@/types/return";
import { Book, BookCardItem, UserBook } from "@/types/book";
import { LOG_SCOPE, logger } from "@/lib/logger";
import { UserBookFormValues } from "@/schema/userBook.schema";
import { AddBookFormData } from "@/schema/addBook.schema";

export const getMyBooks = async (): Promise<BookCardItem[]> => {
  const { data } = await api.get<ApiResponse<UserBook[]>>("/api/book/me");
  return data.data.map(mapUserBook);
};

export const getBorrowedBooks = async (): Promise<BookCardItem[]> => {
  const { data } =
    await api.get<ApiResponse<BorrowRecord[]>>("/api/record/borrow");
  // logger.debug(LOG_SCOPE.request, "borrowed request: ", { data });
  return data.data.map((record) => mapBorrowRecord(record, "borrowed"));
};

export const getLentBooks = async (): Promise<BookCardItem[]> => {
  const { data } =
    await api.get<ApiResponse<BorrowRecord[]>>("/api/record/lend");
  // logger.debug(LOG_SCOPE.request, "lent request: ", { data });
  return data.data.map((record) => mapBorrowRecord(record, "lent"));
};

export const getUserBooks = async (id: string): Promise<BookCardItem[]> => {
  const { data } = await api.get<ApiResponse<UserBook[]>>(`/api/book/${id}`);
  return data.data.map(mapUserBook);
};

export const getUserBookDetails = async (id: string): Promise<UserBook> => {
  const { data } = await api.get<ApiResponse<UserBook>>(
    `/api/book/details/user/${id}`,
  );
  return data.data;
};

export const getBookDetails = async (id: string): Promise<Book> => {
  const { data } = await api.get<ApiResponse<Book>>(`/api/book/details/${id}`);
  return data.data;
};

export const getSearchBooks = async (
  search?: string,
  genre?: string,
  sort?: string,
  limit?: number,
): Promise<BookCardItem[]> => {
  const { data } = await api.get<ApiResponse<Book[]>>("/api/book/search", {
    params: {
      query: search,
      genre,
      sort,
      limit,
    },
  });

  return data.data.map(mapBook);
};

export const returnBook = async (bookId: string) => {
  const { data } = await api.post<ApiResponse<null>>(
    `/api/book/return/${bookId}`,
  );

  return data.data;
};

export const isbnScan = async (isbn: string) => {
  const { data } = await api.get<ApiResponse<Book>>(`/api/book/isbn/${isbn}`);
  logger.debug(LOG_SCOPE.request, "ISBN Scan data: ", data.data);
  return data.data;
};

export const createBookByISBNScan = async (
  bookId: string,
  userBook: UserBookFormValues,
) => {
  const { data } = await api.post<ApiResponse<UserBook>>(
    `/api/book/${bookId}`,
    {
      userBook,
    },
  );

  return data.data;
};

export const createBookManually = async (userBook: AddBookFormData) => {
  const { data } = await api.post<ApiResponse<AddBookFormData>>(
    `/api/book/manual`,
    userBook,
  );

  return data.data;
};
