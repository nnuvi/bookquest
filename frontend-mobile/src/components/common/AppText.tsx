import { Text, TextProps } from "react-native";

type AppTextProps = TextProps & {
  className?: string;
};

export default function AppText({
  className,
  ...props
}: AppTextProps) {
  return (
    <Text
      className={
        className
          ? className
          : "text-text-light text-md"
      }
      {...props}
    />
  );
}
