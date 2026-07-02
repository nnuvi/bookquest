import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";

interface OfflineScreenProps {
  illustration?: React.ReactNode;

  title?: string;
  description?: string;

  retryText?: string;
  onRetry?: () => void;

  secondaryButtonText?: string;
  onSecondaryPress?: () => void;
}

export default function OfflineScreen({
  illustration,

  title = "You're Offline",
  description = "Please check your internet connection and try again.",

  retryText = "Try Again",
  onRetry,

  secondaryButtonText,
  onSecondaryPress,
}: OfflineScreenProps) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}
    >
      <View className="flex-1 items-center justify-center px-8">
        <View className="mb-6">
          {illustration ?? (
            <MaterialIcons name="wifi-off" size={72} color={Colors.gray} />
          )}
        </View>

        <AppText size="2xl" weight="bold" className="text-center">
          {title}
        </AppText>

        <AppText color="secondary" className="mt-3 text-center">
          {description}
        </AppText>

        {retryText && onRetry && (
          <View className="mt-8 w-full">
            <Button title={retryText} onPress={onRetry} />
          </View>
        )}

        {secondaryButtonText && onSecondaryPress && (
          <View className="mt-3 w-full">
            <Button title={secondaryButtonText} onPress={onSecondaryPress} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
