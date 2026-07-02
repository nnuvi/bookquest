import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import LogoText from "@/components/common/LogoText";
import StatusBar from "@/components/common/StatusBar";
import { Colors } from "@/constants/Colors";

export default function Landing() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-background px-6">
      <StatusBar />
      <LogoText variant="dark" />

      <Text className="text-center text-midgray mb-10">
        Manage, borrow, and track your books easily.
      </Text>

      <TouchableOpacity
        className="border bg-button border-primary px-6 py-3 rounded-full w-full mb-3"
        onPress={() => router.push("/(auth)/login")}
      >
        <Text className="text-text-dark text-center">Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="border bg-button border-primary px-6 py-3 rounded-full w-full"
        onPress={() => router.push("/(auth)/signup")}
      >
        <Text className="text-text-dark text-center">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
