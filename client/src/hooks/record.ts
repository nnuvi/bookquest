import { useQuery } from "@tanstack/react-query";
import { getBorrowRecord } from "@/services/record.service";

export const recordKeys = {
  all: ["record"] as const,
  detail: (userBookId: string) => [...recordKeys.all, userBookId] as const,
};

export function useBorrowRecord(userBookId?: string) {
  return useQuery({
    queryKey: recordKeys.detail(userBookId ?? ""),
    queryFn: () => getBorrowRecord(userBookId!),
    enabled: !!userBookId,
  });
}