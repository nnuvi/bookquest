import { Colors } from "@/constants/Colors";
import { TextInput, TextInputProps, View } from "react-native";

type InputProps = TextInputProps & {
  error?: boolean;
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
  "full": "rounded-full",
};

export default function Input({
  error,
  rounded = "full",
  className,
  ...props
}: InputProps) {
  return (
    <View
      className={`
        ${roundedStyles[rounded]}
        border
        bg-input
        px-4
        ${error ? "border-danger" : "border-border"}
      `}
    >
      <TextInput
        {...props}
        className={`text-lg text-text ${className ?? ""}`}
        placeholderTextColor={Colors.neutral}
      />
    </View>
  );
}
