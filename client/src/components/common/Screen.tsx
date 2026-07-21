import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { ReactNode } from "react";
import { Colors } from "@/constants/Colors";

type Props = {
  children: ReactNode;
  statusBarColor?: string;
};

export default function Screen({
  children,
  statusBarColor = Colors.primary,
}: Props) {
  return (
    <SafeAreaView
      style={{ flex: 1, width: "100%", backgroundColor: statusBarColor }}
    >
      <View className="flex-1 w-full bg-background">{children}</View>
    </SafeAreaView>
  );
}
