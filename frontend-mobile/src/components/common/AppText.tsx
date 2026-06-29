import { Text, TextProps } from "react-native";

type AppTextProps = TextProps & {
  color?:
    | "default"
    | "light"
    | "secondary"
    | "primary"
    | "success"
    | "warning"
    | "danger";

  weight?: "regular" | "medium" | "semibold" | "bold";

  size?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl";

  className?: string;
};

const colorStyles = {
  default: "text-text-light",
  light: "text-background",
  secondary: "text-midgray-dark",
  primary: "text-primary",
  success: "text-green-600",
  warning: "text-yellow-600",
  danger: "text-red-600",
};

const weightStyles = {
  regular: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const sizeStyles = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
};

export default function AppText({
  color = "default",
  weight = "regular",
  size = "base",
  className = "",
  ...props
}: AppTextProps) {
  return (
    <Text
      className={`
        ${sizeStyles[size]}
        ${colorStyles[color]}
        ${weightStyles[weight]}
        ${className}
      `}
      {...props}
    />
  );
}