import AppModal from "@/components/ui/AppModal";
import BorrowRequestForm, {
  BorrowRequestFormValues,
} from "./BorrowRequestForm";

type Props = {
  visible: boolean;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (values: BorrowRequestFormValues) => void;
};

export default function BorrowRequestModal({
  visible,
  loading,
  onClose,
  onSubmit,
}: Props) {
  return (
    <AppModal visible={visible} onClose={onClose}>
      <BorrowRequestForm
        loading={loading}
        onCancel={onClose}
        onSubmit={onSubmit}
      />
    </AppModal>
  );
}