import React, { useEffect, useRef } from "react";
import {
  Modal,
  Pressable,
  View,
  ScrollView,
  useWindowDimensions,
  Animated,
  Easing,
} from "react-native";

import { Colors } from "@/constants/Colors";

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

  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 220,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scale.setValue(0.9);
      opacity.setValue(0);
    }
  }, [visible, opacity, scale]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 items-center justify-center bg-black/50 p-5"
        onPress={onClose}
      >
        <Pressable onPress={(e) => e.stopPropagation()}>
          <Animated.View
            className="overflow-hidden rounded-3xl"
            style={{
              width: modalWidth,
              maxHeight: height * 0.85,

              backgroundColor: Colors.background,

              transform: [{ scale }],
              opacity,

              elevation: 16,

              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 24,
              shadowOffset: {
                width: 0,
                height: 12,
              },
            }}
          >
            {title && (
              <View className="border-b border-neutral-200 px-6 py-4">
                {title}
              </View>
            )}

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                padding: 24,
              }}
            >
              {children}
            </ScrollView>

            {actions && (
              <View className="border-t border-neutral-200 px-6 py-5">
                {actions}
              </View>
            )}
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}