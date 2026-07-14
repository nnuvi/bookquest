import { View } from "react-native";

import Button from "@/components/ui/Button";
import {
  useRespondBorrowRequest,
  useRevokeBorrowRequest,
} from "@/hooks/borrow";
import { LOG_SCOPE, logger } from "@/lib/logger";
import {
  useCancelReturnRequest,
  useRespondReturnRequest,
} from "@/hooks/return";

type Props = {
  requestId: string;
  mode?: "incoming" | "sent";
  fullWidth?: boolean;
  buttonClassName?: string;
};

export default function ReturnRequestAction({
  requestId,
  mode = "incoming",
  fullWidth = false,
  buttonClassName,
}: Props) {
  const respond = useRespondReturnRequest();
  const revoke = useCancelReturnRequest();

  // logger.debug(LOG_SCOPE.query, "query action", { requestId });

  // if (mode === "sent") {
  //   return (
  //     <Button
  //       title="Cancel"
  //       variant="neutral"
  //       className={fullWidth ? "flex-1" : buttonClassName}
  //       //   loading={revoke.isPending}
  //       onPress={() => revoke.mutate(requestId!)}
  //     />
  //   );
  // }

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
      {/* <View className="flex-1"> */}
      <Button
        title="Approve"
        variant="primary"
        //   loading={respond.isPending}
        onPress={() =>
          respond.mutate({
            requestId,
            status: "accepted",
          })
        }
      />
      {/* </View> */}

      {/* <View className="flex-1"> */}
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
