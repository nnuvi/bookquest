import StatusBar from "@/components/common/StatusBar";
import { Stack } from "expo-router";

export default function AppLayout() {

  return (
    <>
    <StatusBar barStyle="default" />
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(app)/books/[bookId]" />
      <Stack.Screen name="(app)/profile/[profileId]" />
    </Stack>
    </>
  );
} 