import React from "react";
import {
  Modal,
  Pressable,
  View,
  ScrollView,
  useWindowDimensions,
} from "react-native";

type AppModalProps = {
  visible: boolean;
  onClose: () => void;

  title?: React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;

  maxWidth?: number;
};

export default function AppModal({
  visible,
  onClose,
  title,
  children,
  actions,
  maxWidth = 500,
}: AppModalProps) {
  const { width, height } = useWindowDimensions();

  const modalWidth = Math.min(width * 0.9, maxWidth);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 items-center justify-center bg-black/50 p-4"
        onPress={onClose}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={{ width: modalWidth, maxHeight: height * 0.85 }}
          className="overflow-hidden rounded-2xl bg-white"
        >
          {title && (
            <View className="border-b border-gray-200 px-6 py-4">
              {title}
            </View>
          )}

          <ScrollView
            contentContainerStyle={{ padding: 24 }}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>

          {actions && (
            <View className="border-t border-gray-200 px-6 py-4">
              {actions}
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
} 