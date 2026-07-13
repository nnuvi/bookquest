import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";

import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

export type ReturnRequestFormValues = {
  message: string;
};

type Props = {
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (message: string) => void;
};

export default function BorrowRequestForm({
  loading,
  onCancel,
  onSubmit,
}: Props) {
  const [message, setMessage] = useState("");

  return (
    // <View className="flex-1 gap-6">
    <View className="gap-6 pb-4 pt-1">
      {/* Header */}
      <View>
        <View className="flex-row items-center gap-2">
          <Ionicons name="book-outline" size={24} color="black" />

          <AppText size="2xl" weight="bold">
            Return this book
          </AppText>
        </View>
      </View>

      {/* Message */}
      <View>
        <AppText weight="semibold">Message (optional)</AppText>

        <TextInput
          multiline
          maxLength={300}
          value={message}
          onChangeText={setMessage}
          placeholder="Write a short message to the owner."
          textAlignVertical="top"
          className="mt-3 min-h-32 rounded-2xl border border-neutral-300 px-4 py-4 text-base"
        />

        {/* <BottomSheetTextInput
          multiline
          maxLength={300}
          value={message}
          onChangeText={setMessage}
          placeholder="Say something to the owner."
          textAlignVertical="top"
          className="mt-3 min-h-30 rounded-2xl border border-neutral-300 px-4 py-4 text-base"
        /> */}

        <AppText size="sm" className="mt-2 self-end text-neutral-500">
          {message.length}/300
        </AppText>
      </View>

      {/* Buttons */}
      <View className="flex-row gap-3">
        <Button
          title="Cancel"
          variant="neutral"
          className="flex-1"
          onPress={onCancel}
        />

        <Button
          title="Send Request"
          variant="secondary"
          className="flex-1"
          //   loading={loading}
          onPress={() => onSubmit(message)}
        />
      </View>
    </View>
  );
}
