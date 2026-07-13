import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";

interface PermissionDeniedScreenProps {
  illustration?: React.ReactNode;

  title?: string;
  description?: string;

  primaryButtonText?: string;
  onPrimaryPress?: () => void;

  secondaryButtonText?: string;
  onSecondaryPress?: () => void;
}

export default function PermissionDeniedScreen({
  illustration,

  title = "Permission Required",
  description = "BookQuest doesn't have the required permission to continue. Please grant access in your device settings.",

  primaryButtonText = "Open Settings",
  onPrimaryPress,

  secondaryButtonText,
  onSecondaryPress,
}: PermissionDeniedScreenProps) {
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
            <MaterialIcons
              name="lock-outline"
              size={72}
              color={Colors.warning}
            />
          )}
        </View>

        <AppText size="2xl" weight="bold" className="text-center">
          {title}
        </AppText>

        <AppText color="secondary" className="mt-3 text-center">
          {description}
        </AppText>

        {primaryButtonText && onPrimaryPress && (
          <View className="mt-8 w-full">
            <Button title={primaryButtonText} onPress={onPrimaryPress} />
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
