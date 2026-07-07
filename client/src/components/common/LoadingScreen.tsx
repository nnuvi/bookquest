import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Circle } from "react-native-animated-spinkit";

import AppText from "@/components/ui/AppText";
import { Colors } from "@/constants/Colors";

interface LoadingScreenProps {
  title?: string;
  description?: string;
  size?: number;
}

export default function LoadingScreen({
  title = "Loading...",
  description,
  size = 48,
}: LoadingScreenProps) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.background, // or Colors.background.light depending on your theme
      }}
    >
      <View className="flex-1 items-center justify-center px-8">
        <Circle size={size} color={Colors.primary} />

        <AppText size="xl" weight="semibold" className="mt-8 text-center">
          {title}
        </AppText>

        {description && (
          <AppText color="secondary" className="mt-2 text-center">
            {description}
          </AppText>
        )}
      </View>
    </SafeAreaView>
  );
}
