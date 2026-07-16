import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createBookByISBNScan,
  getBookDetails,
  getBorrowedBooks,
  getLentBooks,
  getMyBooks,
  getSearchBooks,
  getUserBookDetails,
  getUserBooks,
  isbnScan,
  returnBook,
} from "@/services/book.service";

import { UserBook } from "@/types/book";
import { useFeedback } from "./useFeedbackModal";
import { getErrorMessage } from "@/lib/app";
import { UserBookFormValues } from "@/schema/userBook.schema";

export const bookKeys = {
  all: ["books"] as const,

  my: () => [...bookKeys.all, "my"] as const,
  borrowed: () => [...bookKeys.all, "borrowed"] as const,
  lent: () => [...bookKeys.all, "lent"] as const,

  user: (userId: string) => [...bookKeys.all, "user", userId] as const,

  details: (bookId: string) => [...bookKeys.all, "details", bookId] as const,

  userBook: (bookId: string) => [...bookKeys.all, "userBook", bookId] as const,

  isbn: (isbn: string) => [...bookKeys.all, "isbn", isbn] as const,

  search: (search: string, genre?: string, sort?: string, limit?: number) =>
    [...bookKeys.all, "search", search, genre, sort, limit] as const,
};

export const useMyBooks = () =>
  useQuery({
    queryKey: bookKeys.my(),
    queryFn: getMyBooks,
  });

export const useBorrowedBooks = () =>
  useQuery({
    queryKey: bookKeys.borrowed(),
    queryFn: getBorrowedBooks,
  });

export const useLentBooks = () =>
  useQuery({
    queryKey: bookKeys.lent(),
    queryFn: getLentBooks,
  });

export const useUserBooks = (userId: string) =>
  useQuery({
    queryKey: bookKeys.user(userId),
    queryFn: () => getUserBooks(userId),
    enabled: !!userId,
  });

export const useUserBookDetails = (bookId: string) =>
  useQuery({
    queryKey: bookKeys.userBook(bookId),
    queryFn: () => getUserBookDetails(bookId),
    enabled: !!bookId,
  });

export const useBookDetails = (bookId: string) =>
  useQuery({
    queryKey: bookKeys.details(bookId),
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
    queryKey: bookKeys.search(search, genre, sort, limit),
    queryFn: () => getSearchBooks(search, genre, sort, limit),
    enabled: search.trim().length >= 2,
    staleTime: 0,
    gcTime: 60 * 1000,
    retry: false,
  });

export const useISBNScan = (isbn?: string) =>
  useQuery({
    queryKey: bookKeys.isbn(isbn ?? ""),
    queryFn: () => isbnScan(isbn!),
    enabled: !!isbn,
  });

export const useReturnBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: returnBook,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bookKeys.borrowed(),
      });

      queryClient.invalidateQueries({
        queryKey: bookKeys.lent(),
      });

      queryClient.invalidateQueries({
        queryKey: bookKeys.my(),
      });
    },
  });
};

export const useCreateBookByISBNScan = () => {
  const queryClient = useQueryClient();
  const { success, error } = useFeedback();

  return useMutation({
    mutationFn: ({
      bookId,
      userBook,
    }: {
      bookId: string;
      userBook: UserBookFormValues;
    }) => createBookByISBNScan(bookId, userBook),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: bookKeys.my(),
      });

      queryClient.invalidateQueries({
        queryKey: bookKeys.borrowed(),
      });

      queryClient.invalidateQueries({
        queryKey: bookKeys.lent(),
      });

      queryClient.invalidateQueries({
        queryKey: bookKeys.details(variables.bookId),
      });

      // queryClient.invalidateQueries({
      //   queryKey: bookKeys.userBook(variables.userBook.),
      // });
      success("Sucess", "Added the book to the Library.");
    },
    onError: (err: any) => {
      error("Update Failed", getErrorMessage(err));
    },
  });
};
