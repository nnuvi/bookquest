import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import LogoText from "@/components/common/LogoText";
import StatusBar from "@/components/common/StatusBar";
import { Colors } from "@/constants/Colors";
import Button from "@/components/ui/Button";
import Screen from "@/components/common/Screen";

export default function Landing() {
  const router = useRouter();

  return (
    <Screen>
      <View className="flex-1 justify-center items-center bg-background px-6">
        {/* <StatusBar /> */}
        <LogoText variant="dark" />

        <Text className="text-center text-gray mb-12">
          Manage, borrow, and track your books easily.
        </Text>

        {/* <TouchableOpacity
        className="border bg-button border-primary px-6 py-3 rounded-full w-full mb-3"
        onPress={() => router.push("/(auth)/login")}
      >
        <Text className="text-text text-center">Log In</Text>
      </TouchableOpacity> */}
        <View className="items-start gap-4 w-full mb-12">
          <Button
            title="Login"
            variant="primary"
            fullWidth
            buttonSize="xl"
            onPress={() => router.push("/(auth)/login")}
          />

          <Button
            title="SginUp"
            variant="primary"
            fullWidth
            buttonSize="xl"
            onPress={() => router.push("/(auth)/signup")}
          />
        </View>
        {/* <TouchableOpacity
        className="border bg-button border-primary px-6 py-3 rounded-full w-full"
        onPress={() => router.push("/(auth)/signup")}
      >
        <Text className="text-text text-center">Sign Up</Text>
      </TouchableOpacity> */}
      </View>
    </Screen>
  );
}
