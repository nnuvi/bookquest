import { useState } from "react";

import Button from "@/components/ui/Button";
import BorrowRequestModal from "./BorrowRequestModal";
import { useSendBorrowRequest } from "@/hooks/borrow";

type Props = {
  bookId: string;
  fullWidth?: boolean;
  buttonClassName?: string;
};

export default function BorrowButton({
  bookId,
  fullWidth = false,
  buttonClassName,
}: Props) {
  const [visible, setVisible] = useState(false);

  const sendRequest = useSendBorrowRequest();

  return (
    <>
      <Button
        title="Borrow"
        variant="secondary"
        fullWidth={fullWidth}
        className={buttonClassName}
        onPress={() => setVisible(true)}
      />

      <BorrowRequestModal
        visible={visible}
        loading={sendRequest.isPending}
        onClose={() => setVisible(false)}
        onSubmit={(values) =>
          sendRequest.mutate(
            {
              userBookId: bookId,
              ...values,
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