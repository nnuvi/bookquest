import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";

import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

export type BorrowRequestFormValues = {
  borrowDurationDays: number;
  message: string;
};

type Props = {
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (data: { borrowDurationDays: number; message: string }) => void;
};

const DURATIONS = [7, 14, 21, 30, 60];

export default function BorrowRequestForm({
  loading,
  onCancel,
  onSubmit,
}: Props) {
  const [duration, setDuration] = useState(14);
  const [message, setMessage] = useState("");

  return (
    // <View className="flex-1 gap-6">
    <View className="gap-6 pb-4 pt-1">
      {/* Header */}
      <View>
        <View className="flex-row items-center gap-2">
          <Ionicons name="book-outline" size={24} color="black" />

          <AppText size="2xl" weight="bold">
            Borrow this book
          </AppText>
        </View>

        <AppText className="mt-2 text-text-muted">
          Tell the owner how long you'd like to borrow it.
        </AppText>
      </View>

      {/* Duration */}
      <View>
        <AppText weight="semibold">How long do you need it?</AppText>

        <View className="mt-3 flex-row flex-wrap gap-3">
          {DURATIONS.map((days) => {
            const selected = duration === days;

            return (
              <Pressable
                key={days}
                onPress={() => setDuration(days)}
                className={`rounded-full border px-5 py-2 ${
                  selected
                    ? "border-border bg-primary/80"
                    : "border-neutral-300 bg-background"
                }`}
              >
                <AppText
                  weight="semibold"
                  className={
                    selected ? "text-text-inverse" : "text-neutral-700"
                  }
                >
                  {days} days
                </AppText>
              </Pressable>
            );
          })}
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
          onPress={() =>
            onSubmit({
              borrowDurationDays: duration,
              message,
            })
          }
        />
      </View>
    </View>
  );
}
