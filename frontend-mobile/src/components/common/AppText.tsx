import { Text, TextProps } from "react-native";

type AppTextProps = TextProps & {
  className?: string;
};

export default function AppText({
  className = "",
  ...props
}: AppTextProps) {
  return (
    <Text
      className={`text-text-light text-md ${className}`}
      {...props}
    />
  );
}