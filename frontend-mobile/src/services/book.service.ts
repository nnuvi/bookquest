import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { mapBook, mapBorrowRecord, mapUserBook } from "./book.mapper";
import { BorrowRecord } from "@/types/borrow";
import { Book, BookCardItem, UserBook } from "@/types/book";

export const getMyBooks = async (): Promise<BookCardItem[]> => {
  const { data } = await api.get<ApiResponse<UserBook[]>>("/api/book/me");
  return data.data.map(mapUserBook);
};

export const getBorrowedBooks = async (): Promise<BookCardItem[]> => {
  const { data } = await api.get<ApiResponse<BorrowRecord[]>>(
    "/api/record/borrow"
  );
  return data.data.map((record) => mapBorrowRecord(record, "borrowed"));
};

export const getLentBooks = async (): Promise<BookCardItem[]> => {
  const { data } = await api.get<ApiResponse<BorrowRecord[]>>(
    "/api/record/lend"
  );
  return data.data.map((record) => mapBorrowRecord(record, "lent"));
};

export const getUserBooks = async (
  id: string
): Promise<BookCardItem[]> => {
  const { data } = await api.get<ApiResponse<UserBook[]>>(`/api/book/${id}`);
  return data.data.map(mapUserBook);
};

export const getUserBookDetails = async (
  id: string
): Promise<UserBook> => {
  const { data } = await api.get<ApiResponse<UserBook>>(
    `/api/book/details/user/${id}`
  );
  return data.data;
};

export const getBookDetails = async (
  id: string
): Promise<Book> => {
  const { data } = await api.get<ApiResponse<Book>>(
    `/api/book/details/${id}`
  );
  return data.data;
};

export const getBooks = async (
  search?: string,
  genre?: string,
  sort?: string,
  limit?: number
): Promise<BookCardItem[]> => {
  const { data } = await api.get<ApiResponse<Book[]>>("/api/book", {
    params: {
      search,
      genre,
      sort,
      limit,
    },
  });

  return data.data.map(mapBook);
};

export const returnBook = async (bookId: string) => {
  const { data } = await api.post<ApiResponse<null>>(
    `/book/return/${bookId}`
  );

  return data;
};