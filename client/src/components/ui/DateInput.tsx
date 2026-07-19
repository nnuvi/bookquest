import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, PressableProps } from "react-native";

import AppText from "./AppText";

type DateInputProps = PressableProps & {
  value?: Date;
  placeholder?: string;
  error?: boolean;
};

export default function DateInput({
  value,
  placeholder = "Select date",
  disabled = false,
  error,
  className,
  ...props
}: DateInputProps) {
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
        bg-input
        px-4
        py-3
        ${error ? "border-danger" : "border-border"}
        ${className ?? ""}
      `}
    >
      <AppText
        color={disabled ? "darkGray" : value ? "default" : "darkGray"}
        size="lg"
        // className={value ? "text-lg text-text" : "text-lg text-neutral"}
      >
        {value ? value.toLocaleDateString() : placeholder}
      </AppText>

      <Ionicons name="calendar-outline" size={20} color="currentColor" />
    </Pressable>
  );
}
