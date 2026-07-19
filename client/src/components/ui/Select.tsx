import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, PressableProps, View } from "react-native";

import AppText from "./AppText";

type SelectProps = PressableProps & {
  value?: string;
  placeholder?: string;
  error?: boolean;
  showFloatingLabel?: boolean;
};

export default function Select({
  value,
  placeholder = "Select",
  disabled = false,
  error,
  className,
  showFloatingLabel = false,
  ...props
}: SelectProps) {
  const hasValue = !!value;
  const showLabel = showFloatingLabel && hasValue;
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
          className={value ? "text-text text-lg" : "text-neutral text-lg"}
        >
          {value || placeholder}
        </AppText>
      </View>
      <Ionicons name="chevron-down" size={20} color="currentColor" />
    </Pressable>
  );
}
