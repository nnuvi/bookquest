import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { View } from "react-native";

import AppText from "./AppText";
import Input from "./Input";

type FormNumberInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;

  label?: string;
  placeholder?: string;

  disabled?: boolean;

  min?: number;
  max?: number;
};

export default function FormNumberInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled = false,
  min,
  max,
}: FormNumberInputProps<T>) {
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

          <Input
            value={field.value?.toString() ?? ""}
            keyboardType="numeric"
            placeholder={placeholder}
            onBlur={field.onBlur}
            error={!!fieldState.error}
            disabled={disabled}
            onChangeText={(text) => {
              if (text === "") {
                field.onChange(undefined);
                return;
              }

              let value = Number(text);

              if (Number.isNaN(value)) return;

              if (min !== undefined) {
                value = Math.max(value, min);
              }

              if (max !== undefined) {
                value = Math.min(value, max);
              }

              field.onChange(value);
            }}
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
