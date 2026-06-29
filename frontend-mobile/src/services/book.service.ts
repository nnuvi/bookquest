import { api } from "@/lib/api";
import { mapBook, mapBorrowRecord, mapUserBook } from "./book.mapper";
import { BorrowRecord } from "@/types/borrow";
import { Book, BookCardItem, UserBook } from "@/types/book";

export const getMyBooks = async (): Promise<BookCardItem[]> => {
  const { data } = await api.get<UserBook[]>("/book/me");
  return data.map(mapUserBook);
};

export const getBorrowedBooks = async (): Promise<BookCardItem[]> => {
  const { data } = await api.get<BorrowRecord[]>("/record/borrow");
  return data.map((record) => mapBorrowRecord(record, "borrowed"));
};

export const getLentBooks = async (): Promise<BookCardItem[]> => {
  const { data } = await api.get<BorrowRecord[]>("/record/lend");
  return data.map((record) => mapBorrowRecord(record, "lent"));
};

export const getUserBooks = async (
  id: string
): Promise<BookCardItem[]> => {
  const { data } = await api.get<UserBook[]>(`/book/${id}`);
  return data.map(mapUserBook);
};

export const getUserBookDetails = async (
  id: string
): Promise<UserBook> => {
  const { data } = await api.get<UserBook>(`/book/details/user/${id}`);
  return data;
};

export const getBookDetails = async (
  id: string
): Promise<Book> => {
  const { data } = await api.get<Book>(`/book/details/${id}`);
  return data;
};

export const getBooks = async (
  search?: string,
  genre?: string,
  sort?: string,
  limit?: number
): Promise<BookCardItem[]> => {
  const { data } = await api.get<Book[]>("/book", {
    params: {
      search,
      genre,
      sort,
      limit,
    },
  });

  return data.map(mapBook);
};

export const returnBook = async (bookId: string) => {
  const { data } = await api.post(`/book/return/${bookId}`);
  return data;
};