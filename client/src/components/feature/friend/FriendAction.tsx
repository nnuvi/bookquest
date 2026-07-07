import { View } from "react-native";

import Button from "@/components/ui/Button";
import {
  useCancelFriendRequest,
  useFriendStatus,
  useRemoveFriend,
  useRespondFriendRequest,
  useSendFriendRequest,
} from "@/hooks/friend";
import FriendRequestAction from "./FriendRequestAction";

type Props = {
  userId: string;

  // Layout customization
  fullWidth?: boolean;
  buttonClassName?: string;
  containerClassName?: string;
};

export default function FriendAction({
  userId,
  fullWidth = true,
  buttonClassName = "",
  containerClassName = "",
}: Props) {
  const { data: request, isPending } = useFriendStatus(userId);

  const sendRequest = useSendFriendRequest();
  const respondRequest = useRespondFriendRequest();
  const removeFriend = useRemoveFriend();
  const cancelRequest = useCancelFriendRequest();

  if (isPending || !request) return null;

  return (
    <View className={`mt-1 ${containerClassName}`}>
      {request.status === "none" && (
        <Button
          title="Add Friend"
          variant="secondary"
          fullWidth={fullWidth}
          className={buttonClassName}
          onPress={() => sendRequest.mutate(userId)}
        />
      )}

      {request.status === "request_sent" && (
        <Button
          title="Requested"
          variant="neutral"
          fullWidth={fullWidth}
          className={buttonClassName}
          onPress={() => cancelRequest.mutate(request.requestId!)}
        />
      )}

      {request.status === "request_received" && (
        <FriendRequestAction requestId={request.requestId!} />
      )}

      {request.status === "friend" && (
        <Button
          title="Unfriend"
          variant="neutral"
          fullWidth={fullWidth}
          className={buttonClassName}
          onPress={() => removeFriend.mutate(userId)}
        />
      )}
    </View>
  );
}
