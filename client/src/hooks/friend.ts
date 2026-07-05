import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
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

export const useSendFriendRequest = (receiverId: string) => {
  return useQuery({
    queryKey: ["sentFriendRequest"],
    queryFn: () => sendFriendRequest(receiverId),
    enabled: !!receiverId,
  });
};

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
      logger.debug(LOG_SCOPE.request, "Mutation For Friend: ");
      // console.log("queri keys: ", queryClient.getQueryCache().getAll());
      console.log("Before", queryClient.getQueryCache().getAll());

      queryClient.refetchQueries({
        queryKey: ["friendRequests"],
      });

      console.log("After", queryClient.getQueryCache().getAll());
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
