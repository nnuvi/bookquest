import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function AuthLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          gestureEnabled: true,
        }}
      >
        <Stack.Screen
          name="login"
          options={{
            animation: "fade",
          }}
        />

        <Stack.Screen
          name="signup"
          options={{
            animation: "fade",
          }}
        />

        <Stack.Screen
          name="landing"
          options={{
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </>
  );
}
