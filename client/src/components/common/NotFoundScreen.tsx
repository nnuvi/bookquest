import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";

interface NotFoundScreenProps {
  icon?: React.ReactNode;

  title?: string;
  description?: string;

  buttonText?: string;
  onPress?: () => void;

  secondaryButtonText?: string;
  onSecondaryPress?: () => void;
}

export default function NotFoundScreen({
  icon,
  title = "Not Found",
  description = "The content you're looking for doesn't exist or may have been removed.",
  buttonText,
  onPress,
  secondaryButtonText,
  onSecondaryPress,
}: NotFoundScreenProps) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}
    >
      <View className="flex-1 items-center justify-center px-8">
        <View className="mb-6">
          {icon ?? (
            <MaterialIcons name="search-off" size={72} color={Colors.neutral} />
          )}
        </View>

        <AppText size="2xl" weight="bold" className="text-center">
          {title}
        </AppText>

        <AppText color="secondary" className="mt-3 text-center">
          {description}
        </AppText>

        {buttonText && onPress && (
          <View className="mt-8 w-full">
            <Button title={buttonText} onPress={onPress} />
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
