import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookDeatails, getBorrowedBooks, getLentBooks, getMyBooks, getUserBooks, returnBook } from "@/services/book.service";

export const useMyBooks = () => {
  return useQuery({
    queryKey: ["myBooks"],
    queryFn: getMyBooks,
  });
};

export const useBorrowedBooks = () => {
  return useQuery({
    queryKey: ["borrowedBooks"],
    queryFn: getBorrowedBooks,
  });
};

export const useLentBooks = () => {
  return useQuery({
    queryKey: ["lentBooks"],
    queryFn: getLentBooks,
  });
};

export const useUserBooks = (userId: string) => {
  return useQuery({
    queryKey: ["userBooks", userId],
    queryFn: () => getUserBooks(userId),
  });
};

export const useBookDeatails = (bookId: string) => {
  return useQuery({
    queryKey: ["bookDetails", bookId],
    queryFn: () => getBookDeatails(bookId),
  });
};


export const useReturnBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: returnBook,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["borrowedBooks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["lentBooks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["myBooks"],
      });
    },
  });
};