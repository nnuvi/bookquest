import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, PressableProps, View } from "react-native";

import AppText from "./AppText";
import { useState } from "react";

type DateInputProps = PressableProps & {
  value?: Date;
  placeholder?: string;
  error?: boolean;
  showFloatingLabel?: boolean;
};

export default function DateInput({
  value,
  placeholder = "Select date",
  disabled = false,
  error,
  className,
  showFloatingLabel = false,
  ...props
}: DateInputProps) {
  const showLabel = showFloatingLabel && !!value;
  return (
    <Pressable
      {...props}
      disabled={disabled}
      className={`
        flex-row
        items-center
        justify-between
        rounded-full
        border
        relative
        h-16
        bg-input
        px-6
        py-3
        ${error ? "border-danger" : "border-border"}
        ${className ?? ""}
      `}
    >
      <View className="justify-center">
        {showLabel && (
          <AppText size="xs" color="placeholder" className="mb-0">
            {placeholder}
          </AppText>
        )}

        <AppText
          color={
            disabled
              ? "muted"
              : placeholder
                ? "placeholder"
                : value
                  ? "default"
                  : "placeholder"
          }
          size="lg"

          // className={value ? "text-lg text-text" : "text-lg text-neutral"}
        >
          {value ? value.toLocaleDateString() : placeholder}
        </AppText>
      </View>

      <Ionicons name="calendar-outline" size={20} color="currentColor" />
    </Pressable>
  );
}
