import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelFriendRequest,
  getFriendRequests,
  getFriendStatus,
  removeFriend,
  respondFriendRequest,
  sendFriendRequest,
} from "@/services/friend.service";
import { FriendRequestAction } from "@/types/user";
import { LOG_SCOPE, logger } from "@/lib/logger";

export const useFriendRequest = () => {
  return useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });
};

export const useFriendStatus = (userId: string) => {
  return useQuery({
    queryKey: ["friendStatus", userId],
    queryFn: () => getFriendStatus(userId),
    enabled: !!userId,
  });
};

export function useSendFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (receiverId: string) => sendFriendRequest(receiverId),

    onSuccess: (_, receiverId) => {
      queryClient.invalidateQueries({
        queryKey: ["friendStatus", receiverId],
      });

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
}

export function useRespondFriendRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      requestId,
      action,
    }: {
      requestId: string;
      action: FriendRequestAction;
    }) => respondFriendRequest(requestId, action),

    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["friendRequests"],
      });

      // console.log("After", queryClient.getQueryCache().getAll());
      queryClient.invalidateQueries({
        queryKey: ["myProfile"],
      });

      queryClient.invalidateQueries({
        queryKey: ["friends"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      });
    },
  });
}

export function useRemoveFriend() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendId: string) => removeFriend(friendId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useCancelFriendRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestId: string) => cancelFriendRequest(requestId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["friendRequests"],
      });

      queryClient.invalidateQueries({
        queryKey: ["friendStatus"],
      });

      queryClient.invalidateQueries({
        queryKey: ["friends"],
      });

      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
      });

      queryClient.invalidateQueries({
        queryKey: ["myProfile"],
      });

      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
}
