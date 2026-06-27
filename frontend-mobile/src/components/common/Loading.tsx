import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Circle } from "react-native-animated-spinkit";
import { Colors } from "@/constants/Colors";

export default function Loading() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 justify-center items-center">
        <Circle size={48} color={Colors.primary} />
      </View>
    </SafeAreaView>
  );
}
