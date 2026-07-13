import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  revokeBorrowRequest,
  getBorrowRequests,
  getSentBorrowRequests,
  getBorrowStatus,
  respondToBorrowRequest,
  sendBorrowRequest,
  getBorrowRequest,
} from "@/services/borrow.service";
import { FriendRequestAction } from "@/types/user";
import { BorrowRequestStatus } from "@/types/borrow";
import { useFeedback } from "./useFeedbackModal";
import { getErrorMessage } from "@/lib/app";

export const borrowKeys = {
  all: ["borrow"] as const,

  requests: () => [...borrowKeys.all, "requests"] as const,

  sentRequests: () => [...borrowKeys.all, "sentRequests"] as const,

  details: (requestId: string) =>
    [...borrowKeys.all, "details", requestId] as const,

  status: (userBookId: string) =>
    [...borrowKeys.all, "status", userBookId] as const,
};

export const useBorrowRequestDetails = (requestId: string) => {
  return useQuery({
    queryKey: [...borrowKeys.all, "details", requestId],
    queryFn: () => getBorrowRequest(requestId),
    enabled: !!requestId,
  });
};

export const useBorrowRequest = () => {
  return useQuery({
    queryKey: borrowKeys.requests(),
    queryFn: getBorrowRequests,
  });
};

export const useBorrowSentRequest = () => {
  return useQuery({
    queryKey: borrowKeys.sentRequests(),
    queryFn: getSentBorrowRequests,
  });
};

// Borrow status
export const useBorrowStatus = (bookId: string) =>
  useQuery({
    queryKey: borrowKeys.status(bookId),
    queryFn: () => getBorrowStatus(bookId),
    enabled: !!bookId,
  });

// Send request
export const useSendBorrowRequest = () => {
  const queryClient = useQueryClient();
  const { success, error } = useFeedback();

  return useMutation({
    mutationFn: ({
      userBookId,
      borrowDurationDays,
      message,
    }: {
      userBookId: string;
      borrowDurationDays: number;
      message: string;
    }) => sendBorrowRequest(userBookId, borrowDurationDays, message),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: borrowKeys.sentRequests(),
      });

      queryClient.invalidateQueries({
        queryKey: borrowKeys.status(variables.userBookId),
      });

      success("Request Sent", "Your borrow request has been sent.");
    },
    onError: (err: any) => {
      error("Request Failed",getErrorMessage(err));
    },
  });
};

// Accept / Decline request
export const useRespondBorrowRequest = () => {
  const queryClient = useQueryClient();
  const { success, error } = useFeedback();

  return useMutation({
    mutationFn: ({
      requestId,
      status,
    }: {
      requestId: string;
      status: BorrowRequestStatus;
    }) => respondToBorrowRequest(requestId, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: borrowKeys.requests(),
      });

      queryClient.invalidateQueries({
        queryKey: borrowKeys.sentRequests(),
      });

      queryClient.invalidateQueries({
        queryKey: borrowKeys.all,
      });

      success("Request Updated", "The borrow request has been updated.");
    },
    onError: (err: any) => {
      error("Update Failed", getErrorMessage(err));
    },
  });
};

// Cancel request
export const useRevokeBorrowRequest = () => {
  const queryClient = useQueryClient();
  const { success, error } = useFeedback();

  return useMutation({
    mutationFn: revokeBorrowRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: borrowKeys.sentRequests(),
      });

      queryClient.invalidateQueries({
        queryKey: borrowKeys.all,
      });

      success("Request Cancelled", "The borrow request has been cancelled.");
    },
    onError: (err: any) => {
      error("Update Failed", getErrorMessage(err));
    },
  });
};
