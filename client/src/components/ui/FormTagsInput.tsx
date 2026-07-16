import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Pressable, TextInput, View } from "react-native";

import AppText from "./AppText";
import TagsInput from "./TagsInput";

type FormTagsInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;

  label?: string;
  placeholder?: string;
};

export default function FormTagsInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: FormTagsInputProps<T>) {
  const [text, setText] = useState("");

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <View className="mb-5">
          {label && (
            <AppText size="lg" weight="semibold" className="mb-2">
              {label}
            </AppText>
          )}

          <TagsInput
            value={field.value ?? []}
            onChange={field.onChange}
            placeholder={placeholder}
            error={!!fieldState.error}
          />

          {!!fieldState.error && (
            <AppText className="mt-1 text-sm text-danger">
              {fieldState.error.message}
            </AppText>
          )}
        </View>
      )}
    />
  );
}
