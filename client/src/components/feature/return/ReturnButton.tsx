import { useState } from "react";

import Button from "@/components/ui/Button";
import ReturnRequestModal from "./ReturnRequestModal";
import { useSendReturnRequest } from "@/hooks/return";
import { LOG_SCOPE, logger } from "@/lib/logger";

type Props = {
  recordId: string;
  fullWidth?: boolean;
  className?: string;
  buttonClassName?: string;
};

export default function ReturnButton({
  recordId,
  fullWidth = false,
  buttonClassName,
}: Props) {
  const [visible, setVisible] = useState(false);

  const sendReturnRequest = useSendReturnRequest();

  logger.debug(LOG_SCOPE.record, "Retrun req: ", {
    recordId
  })

  return (
    <>
      <Button
        title="Return"
        variant="primary"
        fullWidth={fullWidth}
        className={buttonClassName}
        onPress={() => setVisible(true)}
      />

      <ReturnRequestModal
        visible={visible}
        loading={sendReturnRequest.isPending}
        onClose={() => setVisible(false)}
        onSubmit={(message) =>
          sendReturnRequest.mutate(
            {
              recordId,
              message,
            },
            {
              onSuccess: () => setVisible(false),
            },
          )
        }
      />
    </>
  );
}
