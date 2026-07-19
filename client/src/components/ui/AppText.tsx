import { Text, TextProps } from "react-native";

export type AppTextProps = TextProps & {
  color?:
    | "default"
    | "light"
    | "primary"
    | "secondary"
    | "selection"
    | "text"
    | "yellow"
    | "red"
    | "green"
    | "muted"
    | "gray"
    | "neutral"
    | "placeholder"
    | "choco"
    | "savoy";

  weight?: "regular" | "medium" | "semibold" | "bold";

  size?: "xs" | "sm" | "md" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

  center?: boolean;

  className?: string;
};

const colorStyles = {
  default: "text-text",
  light: "text-text-inverse",
  primary: "text-primary",
  secondary: "text-primary-light",
  selection: "text-selection",

  text: "text-text",

  yellow: "text-warning",
  red: "text-danger",
  green: "text-success",

  placeholder: "text-text-muted",
  neutral: "text-neutral",
  muted: "text-neutral-dark",
  gray: "text-neutral-text",

  choco: "text-choco",
  savoy: "text-savoy",
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
  md: "text-md",
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
  center,
  ...props
}: AppTextProps) {
  return (
    <Text
      className={`
        ${sizeStyles[size]}
        ${colorStyles[color]}
        ${weightStyles[weight]}
        ${center ? "text-center" : ""}
        ${className}
      `}
      {...props}
    />
  );
}
