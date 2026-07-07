import Button from "@/components/ui/Button";
import { useRespondFriendRequest } from "@/hooks/friend";
import { View } from "react-native";

type FriendRequestActionProps = {
  requestId: string;
  fullWidth?: boolean;
  buttonClassName?: string;
};

export default function FriendRequestAction({
  requestId,
  fullWidth = true,
  buttonClassName = "",
}: FriendRequestActionProps) {
  const respondMutation = useRespondFriendRequest();

  return (
    <View className="flex-row gap-2">
      <Button
        title="Accept"
        variant="secondary"
        fullWidth={fullWidth}
        className={fullWidth ? "flex-1" : buttonClassName}
        // className="flex-1"
        // loading={
        //   respondMutation.isPending &&
        //   respondMutation.variables?.requestId === requestId &&
        //   respondMutation.variables?.action === "accepted"
        // }
        onPress={() =>
          respondMutation.mutate({
            requestId,
            action: "accepted",
          })
        }
      />

      <Button
        title="Decline"
        variant="neutral"
        fullWidth={fullWidth}
        className={fullWidth ? "flex-1" : buttonClassName}
        // className="flex-1"
        // loading={
        //   respondMutation.isPending &&
        //   respondMutation.variables?.requestId === requestId &&
        //   respondMutation.variables?.action === "declined"
        // }
        onPress={() =>
          respondMutation.mutate({
            requestId,
            action: "declined",
          })
        }
      />
    </View>
  );
}
