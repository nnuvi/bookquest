import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import {
  BorrowRequest,
  BorrowRequestStatus,
  BorrowStatus,
  BorrowStatusResponse,
} from "@/types/borrow";
import { mapBorrowRequestBook } from "./book.mapper";
import { BookCardItem } from "@/types/book";
import { LOG_SCOPE, logger } from "@/lib/logger";

// import { api } from "@/lib/api";
// import { LOG_SCOPE, logger } from "@/lib/logger";

// import { ApiResponse } from "@/types/api";
// import { BookCardItem } from "@/types/book";
// import { BorrowRequest, BorrowRequestStatus } from "@/types/borrow";

// import { mapBorrowRequestBook } from "./book.mapper";

export const getBorrowRequest = async (
  requestId: string,
): Promise<BorrowRequest> => {
  const { data } = await api.get<ApiResponse<BorrowRequest>>(
    `/api/borrow/request/${requestId}`,
  );
  logger.debug(LOG_SCOPE.request, "Fetched borrow requests:", data.data);
  return data.data;
};

export const getBorrowRequests = async (): Promise<BookCardItem[]> => {
  const { data } =
    await api.get<ApiResponse<BorrowRequest[]>>(`/api/borrow/request`);
  logger.debug(LOG_SCOPE.request, "Fetched borrow requests before:", { data });
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

export const getSentBorrowRequests = async (): Promise<BookCardItem[]> => {
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

// Send borrow request
export const sendBorrowRequest = async (
  bookId: string,
  borrowDurationDays: number,
  message: string,
) => {
  const { data } = await api.post(`/api/borrow/${bookId}/request`, {
    borrowDurationDays,
    message,
  });

  logger.debug(LOG_SCOPE.request, "Borrow request sent: react Query: ", {
    requestId: data.data._id,
    data
  });

  return data.data;
};

// Accept / Decline request
export const respondToBorrowRequest = async (
  requestId: string,
  status: BorrowRequestStatus,
) => {
  const { data } = await api.patch<ApiResponse<BorrowRequest>>(
    `/api/borrow/request/${requestId}/respond`,
    { status },
  );

  logger.debug(LOG_SCOPE.request, "Borrow request updated:", {
    requestId,
    status,
  });

  return data.data;
};

// Cancel request
export const revokeBorrowRequest = async (requestId: string) => {
  const { data } = await api.patch<ApiResponse<void>>(
    `/api/borrow/request/${requestId}/cancel`,
  );

  logger.debug(LOG_SCOPE.request, "Borrow request cancelled:", {
    requestId,
  });

  return data;
};

// Get borrow status for a book
export const getBorrowStatus = async (
  bookId: string,
): Promise<BorrowStatusResponse> => {
  const { data } = await api.get<ApiResponse<BorrowStatusResponse>>(
    `/api/borrow/${bookId}/status`,
  );

  logger.debug(LOG_SCOPE.request, "Fetched borrow status", data.data);

  return data.data;
};
