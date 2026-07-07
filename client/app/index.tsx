import Loading from "@/components/common/Loading";
import LoadingScreen from "@/components/common/LoadingScreen";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const router = useRouter();

  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);

  useEffect(() => {
    if (loading) return;

    //   if (user) {
    //     router.replace("/(app)/(tabs)/Homepage");
    //   } else {
    //     router.replace("/(auth)/landing");
    //   }
    // }, [user, loading]);

    // user object might exist but be invalid/stale
    if (user?._id) {
      router.replace("/(app)/(tabs)/Homepage");
    } else {
      router.replace("/(auth)/landing");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <LoadingScreen />
      </View>
    );
  }

  return null;
}
