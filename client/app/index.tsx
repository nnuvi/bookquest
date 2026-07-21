import Loading from "@/components/common/Loading";
import LoadingScreen from "@/components/common/LoadingScreen";
import { useAuthUser } from "@/hooks/auth";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const router = useRouter();

  // const user = useAuthStore((s) => s.user);
  // const loading = useAuthStore((s) => s.loading);

  const authUser = useAuthUser();

  useEffect(() => {
    if (authUser.isPending) return;

    //   if (user) {
    //     router.replace("/(app)/(tabs)/Homepage");
    //   } else {
    //     router.replace("/(auth)/landing");
    //   }
    // }, [user, loading]);

    // user object might exist but be invalid/stale
    if (authUser.data?._id) {
      router.replace("/(app)/(tabs)/Homepage");
    } else {
      router.replace("/(auth)/landing");
    }
  }, [authUser.isPending, authUser.data]);

  if (authUser.isPending) {
    return (
      <View className="flex-1 justify-center items-center">
        <LoadingScreen />
      </View>
    );
  }

  return null;
}
