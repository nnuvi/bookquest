import { View } from "react-native";

import Button from "@/components/ui/Button";
import {
  useRespondBorrowRequest,
  useRevokeBorrowRequest,
} from "@/hooks/borrow";
import { LOG_SCOPE, logger } from "@/lib/logger";

type Props = {
  requestId: string;
  mode?: "incoming" | "sent";
  fullWidth?: boolean;
  buttonClassName?: string;
};

export default function BorrowRequestAction({
  requestId,
  mode = "incoming",
  fullWidth = false,
  buttonClassName,
}: Props) {
  const respond = useRespondBorrowRequest();
  const revoke = useRevokeBorrowRequest();

  // logger.debug(LOG_SCOPE.query, "query action", { requestId });

  if (mode === "sent") {
    return (
      <View className="">
        <Button
          title="Cancel"
          variant="neutral"
          className={fullWidth ? "flex-1" : buttonClassName}
          //   loading={revoke.isPending}
          onPress={() => revoke.mutate(requestId)}
        />
      </View>
    );
  }

  return (
    <View className="flex-row gap-2">
      {/* <View className={fullWidth ? "flex-1" : undefined}> */}
      <Button
        title="Approve"
        className={fullWidth ? "flex-1" : buttonClassName}
        //   loading={respond.isPending}
        onPress={() =>
          respond.mutate({
            requestId,
            status: "accepted",
          })
        }
      />
      {/* </View> */}

      {/* <View className={fullWidth ? "flex-1" : undefined}> */}
      <Button
        title="Decline"
        variant="neutral"
        className={fullWidth ? "flex-1" : buttonClassName}
        //   loading={respond.isPending}
        onPress={() =>
          respond.mutate({
            requestId,
            status: "declined",
          })
        }
      />
      {/* </View> */}
    </View>
  );
}
