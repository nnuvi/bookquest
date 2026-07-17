import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, PressableProps, View } from "react-native";

import AppText from "./AppText";

type SelectProps = PressableProps & {
  value?: string;
  placeholder?: string;
  error?: boolean;
};

export default function Select({
  value,
  placeholder = "Select",
  disabled = false,
  error,
  className,
  ...props
}: SelectProps) {
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
      <AppText className={value ? "text-text text-lg" : "text-neutral text-lg"}>
        {value ?? placeholder}
      </AppText>

      <Ionicons name="chevron-down" size={20} color="currentColor" />
    </Pressable>
  );
}
