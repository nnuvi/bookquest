import { api } from "@/lib/api";
import { mapBorrowRecord, mapUserBook } from "./book.mapper";
import { BorrowRecord } from "@/types/borrow";

export const getMyBooks = async () => {
  const { data } = await api.get("/book/me");
  return data.map(mapUserBook);
};

export const getBorrowedBooks = async () => {
  const { data } = await api.get<BorrowRecord[]>("/record/borrow");
  return data.map((book) => mapBorrowRecord(book, "borrowed"));
};

export const getLentBooks = async () => {
  const { data } = await api.get<BorrowRecord[]>("/record/lend");
  return data.map((book) => mapBorrowRecord(book, "lent"));
};

export const getUserBooks = async (id: string) => {
  const { data } = await api.get(`/book/${id}`);
  return data.map(mapUserBook);
};

export const getBookDeatails = async (id: string) => {
  const { data } = await api.get(`/book/details/${id}`);
  return data;
};

export const returnBook = async (bookId: string) => {
  const { data } = await api.post(`/book/return/${bookId}`);
  return data;
};
