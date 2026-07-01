import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserBookDetails,
  // getBooks,
  getBorrowedBooks,
  getLentBooks,
  getMyBooks,
  getUserBooks,
  returnBook,
  getBookDetails,
  getSearchBooks,
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

export const useSearchBooks = (
  search: string,
  genre?: string,
  sort?: string,
  limit?: number,
) =>
  useQuery({
    queryKey: ["searchBooks", search, genre, sort, limit],
    queryFn: () => getSearchBooks(search, genre, sort, limit),
    enabled: search.trim().length >= 2,
    staleTime: 0,
    gcTime: 60 * 1000,
    retry: false,
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
