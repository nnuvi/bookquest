import { getBookByISBN } from "@/services/external.service";
import { useMutation } from "@tanstack/react-query";

export function useBookByISBN() {
  return useMutation({
    mutationFn: getBookByISBN,
  });
}