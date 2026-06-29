import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserBookDetails,
  getBooks,
  getBorrowedBooks,
  getLentBooks,
  getMyBooks,
  getUserBooks,
  returnBook,
  getBookDetails,
} from "@/services/book.service";

export const useMyBooks = () =>
  useQuery({
    queryKey: ["myBooks"],
    queryFn: getMyBooks,
  });

export const useBorrowedBooks = () =>
  useQuery({
    queryKey: ["borrowedBooks"],
    queryFn: getBorrowedBooks,
  });

export const useLentBooks = () =>
  useQuery({
    queryKey: ["lentBooks"],
    queryFn: getLentBooks,
  });

export const useUserBooks = (userId: string) =>
  useQuery({
    queryKey: ["userBooks", userId],
    queryFn: () => getUserBooks(userId),
    enabled: !!userId,
  });

export const useUserBookDetails = (bookId: string) =>
  useQuery({
    queryKey: ["bookDetails", bookId],
    queryFn: () => getUserBookDetails(bookId),
    enabled: !!bookId,
  });

  export const useBookDetails = (bookId: string) =>
  useQuery({
    queryKey: ["bookDetails", bookId],
    queryFn: () => getBookDetails(bookId),
    enabled: !!bookId,
  });

export const useBooks = (
  search?: string,
  genre?: string,
  sort?: string,
  limit?: number
) =>
  useQuery({
    queryKey: ["books", search, genre, sort, limit],
    queryFn: () => getBooks(search, genre, sort, limit),
  });

export const useReturnBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: returnBook,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["borrowedBooks"] });
      queryClient.invalidateQueries({ queryKey: ["lentBooks"] });
      queryClient.invalidateQueries({ queryKey: ["myBooks"] });
    },
  });
};