import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBorrowedBooks, getLentBooks, getMyBooks, returnBook } from "@/services/book.service";

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