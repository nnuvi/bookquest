import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import AppText, { type AppTextProps } from "@/components/ui/AppText";

type ButtonProps = TouchableOpacityProps & {
  title: string;

  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "success"
    | "danger"
    | "lavendar"
    | "neutral";

  size?: "xs" | "sm" | "md" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

  fullWidth?: boolean;

  className?: string;

  textClassName?: string;
};

const variants = {
  primary: {
    container: "bg-primary",
    text: "text-text-inverse",
  },

  secondary: {
    container: "bg-primary-light",
    text: "text-text-inverse",
  },

  success: {
    container: "bg-success",
    text: "text-text-inverse",
  },

  danger: {
    container: "bg-danger",
    text: "text-text-inverse",
  },

  neutral: {
    container: "bg-neutral",
    text: "text-text",
  },

  lavendar: {
    container: "bg-neutral-dark",
    text: "text-text-inverse",
  },

  outline: {
    container: "border border-primary bg-transparent",
    text: "text-primary",
  },
};

const sizes = {
  xs: {
    container: "px-2 py-1",
    text: "xs" as const,
  },

  sm: {
    container: "px-3 py-1.5",
    text: "sm" as const,
  },

  md: {
    container: "px-4 py-2",
    text: "md" as const,
  },

  base: {
    container: "px-5 py-2.5",
    text: "base" as const,
  },

  lg: {
    container: "px-6 py-3",
    text: "lg" as const,
  },

  xl: {
    container: "px-7 py-3.5",
    text: "xl" as const,
  },

  "2xl": {
    container: "px-8 py-4",
    text: "2xl" as const,
  },

  "3xl": {
    container: "px-10 py-5",
    text: "3xl" as const,
  },

  "4xl": {
    container: "px-12 py-6",
    text: "4xl" as const,
  },
} as const;

export default function Button({
  title,
  variant = "secondary",
  size = "base",
  fullWidth = false,
  className = "",
  textClassName = "",
  disabled,
  ...props
}: ButtonProps) {
  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      className={`
        rounded-full
        items-center
        justify-center
        ${currentVariant.container}
        ${currentSize.container}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50" : ""}
        ${className}
      `}
      {...props}
    >
      <AppText
        weight="semibold"
        size={currentSize.text}
        className={`${currentVariant.text} ${textClassName}`}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
}
