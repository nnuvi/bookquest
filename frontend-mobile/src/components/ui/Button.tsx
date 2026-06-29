import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import AppText from "@/components/common/AppText";

type ButtonProps = TouchableOpacityProps & {
  title: string;

  variant?: "primary" | "secondary" | "outline" | "danger";

  size?: "sm" | "md" | "lg";

  fullWidth?: boolean;

  className?: string;

  textClassName?: string;
};

const variantStyles = {
  primary: "bg-button",
  secondary: "bg-gray-200",
  outline: "border border-primary bg-transparent",
  danger: "bg-red-600",
};

const textVariants = {
  primary: "text-background",
  secondary: "text-text-light",
  outline: "text-primary",
  danger: "text-background",
};

const sizeStyles = {
  sm: "px-6 py-2",
  md: "px-8 py-3",
  lg: "px-10 py-4",
};

export default function Button({
  title,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  textClassName = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      className={`
        rounded-full
        items-center
        justify-center
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50" : ""}
        ${className}
      `}
      {...props}
    >
      <AppText
        color={variant === "outline" ? "primary" : "light"}
        weight="semibold"
        size="lg"
        className={textClassName}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
}