import React from "react";
import { Modal, Pressable, View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Button from "@/components/ui/Button";
import AppText from "@/components/ui/AppText";
import { Colors } from "@/constants/Colors";

interface ConfirmationDialogProps {
  visible: boolean;

  title: string;
  description?: string;

  icon?: React.ReactNode;

  confirmText?: string;
  cancelText?: string;

  variant?: "default" | "danger";

  loading?: boolean;

  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationDialog({
  visible,

  title,
  description,

  icon,

  confirmText = "Confirm",
  cancelText = "Cancel",

  variant = "default",

  loading = false,

  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable
        className="flex-1 justify-center bg-black/50 px-6"
        onPress={onCancel}
      >
        <Pressable
          className="rounded-2xl bg-card p-6"
          onPress={(e) => e.stopPropagation()}
        >
          <View className="items-center">
            {icon ?? (
              <MaterialIcons
                name={variant === "danger" ? "warning-amber" : "help-outline"}
                size={56}
                color={variant === "danger" ? Colors.danger : Colors.primary}
              />
            )}

            <AppText size="xl" weight="bold" className="mt-4 text-center">
              {title}
            </AppText>

            {description && (
              <AppText color="secondary" className="mt-2 text-center">
                {description}
              </AppText>
            )}
          </View>

          <View className="mt-8 flex-row">
            <Button
              title={cancelText}
              variant="outline"
              onPress={onCancel}
              className="flex-1 mr-2"
            />

            <Button
              title={confirmText}
              variant={variant === "danger" ? "danger" : "primary"}
              // loading={loading}
              onPress={onConfirm}
              className="flex-1 ml-2"
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
