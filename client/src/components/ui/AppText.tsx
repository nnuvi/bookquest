import { Text, TextProps } from "react-native";

type AppTextProps = TextProps & {
  color?:
    | "default"
    | "light"
    | "primary"
    | "secondary"
    | "selection"
    | "black"
    | "text"
    | "midGray"
    | "yellow"
    | "red"
    | "green"
    | "gray"
    | "choco"
    | "savoy"
    | "blue";

  weight?: "regular" | "medium" | "semibold" | "bold";

  size?: "xs" | "sm" | "md" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

  center?: boolean;

  className?: string;
};

const colorStyles = {
  default: "text-text-light",
  light: "text-background",
  primary: "text-primary",
  secondary: "text-secondary",
  selection: "text-selection",

  black: "text-black",
  text: "text-text",
  midGray: "text-midGray",
  yellow: "text-yellow",
  red: "text-red",
  green: "text-green",
  gray: "text-gray",
  choco: "text-choco",
  savoy: "text-savoy",
  blue: "text-blue",
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
