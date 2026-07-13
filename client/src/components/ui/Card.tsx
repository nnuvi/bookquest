import { View, ViewProps } from "react-native";

type Props = ViewProps;

export default function Card({
  className = "",
  children,
  ...props
}: Props) {
  return (
    <View
      className={`rounded-3xl bg-background p-2 ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}