import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import { useFriendStatus } from "@/hooks/friend";
import { dataTagErrorSymbol } from "@tanstack/react-query";

type Props = {
  userId: string;
};

export default function FriendAction({ userId }: Props) {
  const { data: status, isPending } = useFriendStatus(userId);

  if (isPending) return null;

  switch (status) {
    case "friend":
      return

    case "none":
      return (
        <Button
          title="Add Friend"
          onPress={() => {}}
        />
      );

    case "request_sent":
      return (
        <Button
          title="Requested"
          variant="outline"
          disabled
        />
      );

    case "request_received":
      return (
        <Button
          title="Accept"
          variant="success"
          onPress={() => {}}
        />
      );
  }
}