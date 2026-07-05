import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { BorrowRequest } from "@/types/borrow";
import { mapBorrowRequestBook } from "./book.mapper";
import { BookCardItem } from "@/types/book";
import { LOG_SCOPE, logger } from "@/lib/logger";

export const getBorrowRequests = async (): Promise<BookCardItem[]> => {
  const { data } =
    await api.get<ApiResponse<BorrowRequest[]>>(`/api/borrow/request`);
    logger.debug(
      LOG_SCOPE.request,
      "Fetched borrow requests:",
      data.data.map((r) => ({
        username: r.requester.username,
        title: r.userBook.book.title,
      })),
    );
    return data.data.map(mapBorrowRequestBook);
};

export const getBorrowSentRequests = async (): Promise<BookCardItem[]> => {
  const { data } = await api.get<ApiResponse<BorrowRequest[]>>(
    `/api/borrow/request/sent`,
  );
  logger.debug(
      LOG_SCOPE.request,
      "Fetched borrow sent requests:",
      data.data.map((r) => ({
        username: r.owner.username,
        title: r.userBook.book.title,
      })),
    );
  return data.data.map(mapBorrowRequestBook);
};
