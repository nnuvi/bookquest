import { Colors } from "@/constants/Colors";
import AppText from "@/components/ui/AppText";
import { useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";

type InputProps = TextInputProps & {
  error?: boolean;
  disabled?: boolean;
  showFloatingLabel?: boolean;

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
  placeholder,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={`
        ${roundedStyles[rounded]}
        relative
        border
        bg-input
        px-6
        ${props.multiline ? "py-3 min-h-32" : "h-16 justify-center"}
        ${error ? "border-danger" : "border-border"}
      `}
    >
      {showFloatingLabel && placeholder && (
        <AppText size="xs" color="placeholder" className="mb-0">
          {placeholder}
        </AppText>
      )}

      <TextInput
        {...props}
        textAlignVertical={props.multiline ? "top" : "center"}
        placeholder={showFloatingLabel ? "" : placeholder}
        placeholderTextColor={Colors.textMuted}
        editable={!disabled}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        className={`
          ${props.multiline ? "min-h-22 py-1" : "h-6"}
          p-0
          text-lg
          ${disabled ? "text-neutral-dark" : "text-text"}
          ${className ?? ""}
        `}
      />
    </View>
  );
}
