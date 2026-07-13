import { useState } from "react";

import Button from "@/components/ui/Button";
import ReturnRequestModal from "./ReturnRequestModal";
import { useSendReturnReminder, useSendReturnRequest } from "@/hooks/return";
import { LOG_SCOPE, logger } from "@/lib/logger";

type Props = {
  recordId: string;
  fullWidth?: boolean;
  buttonClassName?: string;
};

export default function AskBackButton({
  recordId,
  fullWidth = false,
  buttonClassName,
}: Props) {
  const askBack = useSendReturnReminder();

  logger.debug(LOG_SCOPE.query, "ask back remind record id: ", recordId);

  return (
    <>
      <Button
        title="Ask Back"
        variant="lavendar"
        fullWidth={fullWidth}
        className={buttonClassName}
        onPress={() => {
          askBack.mutate(recordId);
        }}
      />
    </>
  );
}
