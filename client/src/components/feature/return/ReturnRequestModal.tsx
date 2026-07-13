import { useState } from "react";
import { TextInput, View } from "react-native";

import AppModal from "@/components/ui/AppModal";
import Button from "@/components/ui/Button";
import AppText from "@/components/ui/AppText";
import ReturnRequestAction from "./ReturnActionButton";
import ReturnRequestForm from "./ReturnRequestForm";

type ReturnRequestModalProps = {
  visible: boolean;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (message: string) => void;
};

export default function ReturnRequestModal({
  visible,
  loading = false,
  onClose,
  onSubmit,
}: ReturnRequestModalProps) {
  return (
    <AppModal visible={visible} onClose={onClose}>
      <ReturnRequestForm
        loading={loading}
        onCancel={onClose}
        onSubmit={onSubmit}
      />
    </AppModal>
  );
}
