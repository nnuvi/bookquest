import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";

interface ErrorScreenProps {
  illustration?: React.ReactNode;

  title?: string;
  description?: string;

  retryText?: string;
  onRetry?: () => void;

  secondaryButtonText?: string;
  onSecondaryPress?: () => void;
}

export default function ErrorScreen({
  illustration,

  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",

  retryText = "Retry",
  onRetry,

  secondaryButtonText,
  onSecondaryPress,
}: ErrorScreenProps) {
  return (
    <View className="flex-1">
      <View className=" flex-1 items-center justify-center px-8 pb-50">
        <View className="mb-6">
          {illustration ?? (
            <MaterialIcons name="error-outline" size={72} color={Colors.red} />
          )}
        </View>

        <AppText size="2xl" weight="bold" className="text-center">
          {title}
        </AppText>

        <AppText color="secondary" className="mt-3 text-center">
          {description}
        </AppText>

        {onRetry && (
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
    </View>
  );
}
