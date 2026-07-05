import { useQuery } from "@tanstack/react-query";
import {
  getBorrowRequests,
  getBorrowSentRequests,
} from "@/services/borrow.service";
import { FriendRequestAction } from "@/types/user";

export const useBorrowRequest = () => {
  return useQuery({
    queryKey: ["borrowRequest"],
    queryFn: getBorrowRequests,
  });
};

export const useBorrowSentRequest = () => {
  return useQuery({
    queryKey: ["borrowRequestSent"],
    queryFn: getBorrowSentRequests,
  });
};
