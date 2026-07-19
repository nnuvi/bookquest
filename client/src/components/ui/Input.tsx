import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import AppText from "@/components/ui/AppText";
import { useState } from "react";
import { Pressable, TextInput, TextInputProps, View } from "react-native";

type InputProps = TextInputProps & {
  error?: boolean;
  disabled?: boolean;
  showFloatingLabel?: boolean;
  showPasswordToggle?: boolean;

  rounded?:
    | "xs"
    | "sm"
    | "md"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "full";
};

const roundedStyles = {
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  base: "rounded-base",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "4xl": "rounded-4xl",
  full: "rounded-full",
} as const;

export default function Input({
  error,
  disabled = false,
  rounded = "full",
  className,
  showFloatingLabel = false,
  showPasswordToggle = false,
  placeholder,
  onFocus,
  onBlur,
  secureTextEntry,
  multiline,
  ...props
}: InputProps) {
  const [secure, setSecure] = useState(!!secureTextEntry);

  return (
    <View
      className={`
        ${roundedStyles[rounded]}
        border
        bg-input
        px-6
        ${multiline ? "py-3 min-h-32" : "h-16 justify-center"}
        ${error ? "border-danger" : "border-border"}
      `}
    >
  
      {showFloatingLabel && placeholder && (
        <AppText size="xs" color="placeholder">
          {placeholder}
        </AppText>
      )}

      <View className="flex-row items-center">
        <TextInput
          {...props}
          multiline={multiline}
          editable={!disabled}
          placeholder={showFloatingLabel ? "" : placeholder}
          placeholderTextColor={Colors.textMuted}
          textAlignVertical={multiline ? "top" : "center"}
          secureTextEntry={secure}
          onFocus={(e) => {
            onFocus?.(e);
          }}
          onBlur={(e) => {
            onBlur?.(e);
          }}
          className={`
            flex-1
            p-0
            text-lg
            ${multiline ? "min-h-24 py-1" : "h-6"}
            ${disabled ? "text-neutral-dark" : "text-text"}
            ${className ?? ""}
          `}
        />

        {showPasswordToggle && (
          <Pressable
            onPress={() => setSecure((prev) => !prev)}
            className="ml-3"
          >
            <Ionicons
              name={secure ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="gray"
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}
