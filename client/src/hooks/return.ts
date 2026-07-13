import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  cancelReturnRequest,
  getReturnRequests,
  getReturnStatus,
  getSentReturnRequests,
  respondToReturnRequest,
  sendReturnReminder,
  sendReturnRequest,
} from "@/services/return.service";

import { ReturnRequestStatus } from "@/types/return";
import { useFeedback } from "./useFeedbackModal";
import { borrowKeys } from "./borrow";
import { getErrorMessage } from "@/lib/app";

export const returnKeys = {
  all: ["return"] as const,

  requests: () => [...returnKeys.all, "requests"] as const,

  sentRequests: () => [...returnKeys.all, "sent-requests"] as const,

  status: (recordId: string) =>
    [...returnKeys.all, "status", recordId] as const,
};

// Incoming requests
export const useReturnRequests = () =>
  useQuery({
    queryKey: returnKeys.requests(),
    queryFn: getReturnRequests,
  });

// Sent requests
export const useReturnSentRequests = () =>
  useQuery({
    queryKey: returnKeys.sentRequests(),
    queryFn: getSentReturnRequests,
  });

// Status
export const useReturnStatus = (recordId: string) =>
  useQuery({
    queryKey: returnKeys.status(recordId),
    queryFn: () => getReturnStatus(recordId),
    enabled: !!recordId,
  });

// Send request
export const useSendReturnRequest = () => {
  const queryClient = useQueryClient();
  const { success, error } = useFeedback();

  return useMutation({
    mutationFn: ({
      recordId,
      message,
    }: {
      recordId: string;
      message: string;
    }) => sendReturnRequest(recordId, message),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: returnKeys.sentRequests(),
      });

      queryClient.invalidateQueries({
        queryKey: returnKeys.status(variables.recordId),
      });

      queryClient.invalidateQueries({
        queryKey: borrowKeys.all, // or borrowKeys.status(bookId)
      });

      success("Request Sent", "Your return request has been sent.");
    },

    onError: (err: any) => {
      error("Request Failed", getErrorMessage(err));
    },
  });
};

// Respond
export const useRespondReturnRequest = () => {
  const queryClient = useQueryClient();
  const { success, error } = useFeedback();

  return useMutation({
    mutationFn: ({
      requestId,
      status,
    }: {
      requestId: string;
      status: ReturnRequestStatus;
    }) => respondToReturnRequest(requestId, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: returnKeys.requests(),
      });

      queryClient.invalidateQueries({
        queryKey: returnKeys.sentRequests(),
      });

      queryClient.invalidateQueries({
        queryKey: returnKeys.all,
      });

      success("Request Updated", "The return request has been updated.");
    },

    onError: (err: any) => {
      error("Update Failed", getErrorMessage(err));
    },
  });
};

// Cancel
export const useCancelReturnRequest = () => {
  const queryClient = useQueryClient();
  const { success, error } = useFeedback();

  return useMutation({
    mutationFn: cancelReturnRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: returnKeys.sentRequests(),
      });

      queryClient.invalidateQueries({
        queryKey: returnKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: borrowKeys.all, // or borrowKeys.status(bookId)
      });

      success("Request Cancelled", "The return request has been cancelled.");
    },

    onError: (err: any) => {
      error("Update Failed", getErrorMessage(err));
    },
  });
};

// Reminder
export const useSendReturnReminder = () => {
  const { success, error } = useFeedback();

  return useMutation({
    mutationFn: sendReturnReminder,

    onSuccess: () => {
      success("Reminder Sent", "A reminder has been sent.");
    },

    onError: (err: any) => {
      error("Reminder Failed", getErrorMessage(err));
    },
  });
};
