import { Colors } from "@/constants/Colors";
import { StatusBar, useColorScheme } from "react-native";

type CustomStatusBarProps = {
  barStyle?: "default" | "light-content" | "dark-content";
  translucent?: boolean;
  backgroundColor?: string;
};

export default function CustomStatusBar({
  barStyle,
  translucent = true,
  backgroundColor = Colors.primary,
}: CustomStatusBarProps) {
  const colorScheme = useColorScheme();

  const statusBarStyle =
    barStyle ??
    (colorScheme === "dark"
      ? "light-content"
      : "dark-content");

  return (
    <StatusBar
      barStyle={statusBarStyle}
      translucent={translucent}
      backgroundColor={backgroundColor}
    />
  );
}