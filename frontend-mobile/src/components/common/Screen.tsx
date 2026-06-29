import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Screen({ children }: Props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 bg-background">
        {children}
      </View>
    </SafeAreaView>
  );
}