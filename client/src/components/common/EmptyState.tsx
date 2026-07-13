import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";

interface EmptyStateProps {
  illustration?: React.ReactNode;

  title?: string;
  description?: string;

  actionText?: string;
  onAction?: () => void;
}

export default function EmptyState({
  illustration,

  title = "Nothing here yet",
  description = "There's nothing to show at the moment.",

  actionText,
  onAction,
}: EmptyStateProps) {
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
            <MaterialIcons name="inbox" size={72} color={Colors.neutral} />
          )}
        </View>

        <AppText size="2xl" weight="bold" className="text-center">
          {title}
        </AppText>

        <AppText color="secondary" className="mt-3 text-center">
          {description}
        </AppText>

        {actionText && onAction && (
          <View className="mt-8 w-full">
            <Button title={actionText} onPress={onAction} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
