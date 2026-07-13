import { api } from "@/lib/api";
import { LOG_SCOPE, logger } from "@/lib/logger";

import { ApiResponse } from "@/types/api";
import { BookCardItem } from "@/types/book";
import { ReturnRequest, ReturnRequestStatus } from "@/types/return";

import { mapReturnRequestBook } from "./book.mapper";

// Incoming return requests
export const getReturnRequests = async (): Promise<BookCardItem[]> => {
  const { data } =
    await api.get<ApiResponse<ReturnRequest[]>>("/api/return/request");

  logger.debug(
    LOG_SCOPE.request,
    "Fetched return requests:",
    data.data.map((r) => ({
      username: r.borrower.username,
      title: r.borrowRecord.userBook.book.title,
    })),
  );

  return data.data.map(mapReturnRequestBook);
};

// Sent return requests
export const getSentReturnRequests = async (): Promise<BookCardItem[]> => {
  const { data } =
    await api.get<ApiResponse<ReturnRequest[]>>("/api/return/request/sent");

  logger.debug(
    LOG_SCOPE.request,
    "Fetched sent return requests:",
    data.data.map((r) => ({
      username: r.owner.username,
      title: r.borrowRecord.userBook.book.title,
    })),
  );

  return data.data.map(mapReturnRequestBook);
};

// Send return request
export const sendReturnRequest = async (recordId: string, message: string) => {
  const { data } = await api.post<ApiResponse<ReturnRequest>>(
    `/api/return/${recordId}/request`,{
      message
    }
  );

  logger.debug(LOG_SCOPE.request, "Return request sent:", {
    requestId: data.data._id,
    message
  });

  return data.data;
};

// Accept / Decline return request
export const respondToReturnRequest = async (
  requestId: string,
  status: ReturnRequestStatus,
) => {
  const { data } = await api.patch<ApiResponse<ReturnRequest>>(
    `/api/return/request/${requestId}/respond`,
    { status },
  );

  logger.debug(LOG_SCOPE.request, "Return request updated:", {
    requestId,
    status,
  });

  return data.data;
};

// Cancel return request
export const cancelReturnRequest = async (requestId: string) => {
  const { data } = await api.patch<ApiResponse<void>>(
    `/api/return/request/${requestId}`,
  );

  logger.debug(LOG_SCOPE.request, "Return request cancelled:", {
    requestId,
  });

  return data;
};

// Get return request status
export const getReturnStatus = async (recordId: string) => {
  const { data } = await api.get<
    ApiResponse<{
      status: ReturnRequestStatus;
      requestId?: string;
    }>
  >(`/api/return/${recordId}/status`);

  logger.debug(LOG_SCOPE.request, "Fetched return status:", {
    recordId,
    status: data.data.status,
  });

  return data.data;
};

// Get return request status
export const sendReturnReminder = async (recordId: string) => {
  const { data } = await api.post<
    ApiResponse<{
      status: ReturnRequestStatus;
      requestId?: string;
    }>
  >(`/api/return/${recordId}/remind`);

  logger.debug(LOG_SCOPE.request, "Fetched return status:", {
    recordId,
    status: data.data.status,
  });

  return data.data;
};