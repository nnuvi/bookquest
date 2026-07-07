import { api } from "@/lib/api";
import { LOG_SCOPE, logger } from "@/lib/logger";
import { ApiResponse } from "@/types/api";
import {
  FriendRequest,
  FriendRequestAction,
  FriendStatus,
  FriendStatusDetails,
  User,
} from "@/types/user";

export const getFriendStatus = async (
  userId: string,
): Promise<FriendStatusDetails> => {
  const { data } = await api.get<ApiResponse<FriendStatusDetails>>(
    `/api/friend/status/${userId}`,
  );
  return data.data;
};

export const getFriendRequests = async (): Promise<FriendRequest[]> => {
  const { data } =
    await api.get<ApiResponse<FriendRequest[]>>(`/api/friend/request`);
  logger.debug(
    LOG_SCOPE.request,
    "Friend requests:",
    data.data.map((r) => r.from.username),
  );
  return data.data;
};

export const sendFriendRequest = async (
  receiverId: string,
): Promise<FriendRequest> => {
  const { data } = await api.put<ApiResponse<FriendRequest>>(
    `/api/friend/request/${receiverId}`,
  );
  logger.debug(LOG_SCOPE.request, "Sent friend requests: ", data.data);
  return data.data;
};

export const respondFriendRequest = async (
  requestId: string,
  action: FriendRequestAction,
): Promise<FriendRequest> => {
  const { data } = await api.patch<ApiResponse<FriendRequest>>(
    `/api/friend/request/${requestId}`,
    { action },
  );
  // logger.debug(LOG_SCOPE.request, "Respond friend requests");
  return data.data;
};

export const removeFriend = async (friendId: string): Promise<User> => {
  const { data } = await api.delete<ApiResponse<User>>(
    `/api/friend/${friendId}`,
  );
  // logger.debug(LOG_SCOPE.request, "Remove friend");
  return data.data;
};

export const cancelFriendRequest = async (requestId: string): Promise<void> => {
  await api.patch<ApiResponse<void>>(`/api/friend/request/${requestId}/cancel`);
};
