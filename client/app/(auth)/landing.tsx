import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import LogoText from "@/components/common/LogoText";
import Screen from "@/components/common/Screen";
import Button from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";

export default function Landing() {
  const router = useRouter();

  return (
    <Screen statusBarColor={Colors.background}>
      <View className="flex-1 justify-center items-center px-6">
        {/* <StatusBar /> */}
        <LogoText variant="dark" />

        <Text className="text-center text-primary-light mb-12">
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
