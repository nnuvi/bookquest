import { View } from "react-native";

import { useBorrowStatus } from "@/hooks/borrow";

import BorrowActionButton from "./BorrowActionButton";
import BorrowButton from "./BorrowButton";

import AskBackButton from "../return/AskBackButton";
import ReturnButton from "../return/ReturnButton";

import ReturnActionButton from "../return/ReturnActionButton";
import { LOG_SCOPE, logger } from "@/lib/logger";

type Props = {
  bookId: string;
  fullWidth?: boolean;
  buttonClassName?: string;
  containerClassName?: string;
};

export default function BorrowAction({
  bookId,
  fullWidth = false,
  buttonClassName = "",
  containerClassName = "",
}: Props) {
  const { data } = useBorrowStatus(bookId);

  // logger.debug(LOG_SCOPE.query, "Borrow Action Status: ", {
  //   bookId,
  //   data,
  // });

  if (!data) return null;

  return (
    <View className={containerClassName}>
      {data.actions.includes("borrow") && (
        <BorrowButton
          bookId={bookId}
          fullWidth={fullWidth}
          buttonClassName={buttonClassName}
        />
      )}

      {data.actions.includes("cancel-borrow-request") && (
        <BorrowActionButton
          requestId={data.borrowRequestId!}
          mode="sent"
          fullWidth={fullWidth}
          buttonClassName={buttonClassName}
        />
      )}

      {data.actions.includes("accept-borrow-request") && (
        <BorrowActionButton
          requestId={data.borrowRequestId!}
          fullWidth={fullWidth}
          buttonClassName={buttonClassName}
        />
      )}

      {data.actions.includes("return") && (
        <ReturnButton
          recordId={data.borrowRecordId!}
          fullWidth={fullWidth}
          buttonClassName={buttonClassName}
        />
      )}

      {data.actions.includes("ask-back") && (
        <AskBackButton
          recordId={data.borrowRecordId!}
          fullWidth={fullWidth}
          buttonClassName={buttonClassName}
        />
      )}

      {data.actions.includes("accept-return-request") && (
        <ReturnActionButton
          requestId={data.returnRequestId!}
          fullWidth={fullWidth}
          buttonClassName={buttonClassName}
        />
      )}

      {data.actions.includes("cancel-return-request") && (
        <ReturnActionButton
          requestId={data.returnRequestId!}
          fullWidth={fullWidth}
          mode="sent"
          buttonClassName={buttonClassName}
        />
      )}
    </View>
  );
}
