import { useState } from "react";
import { Platform, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import AppText from "./AppText";
import DateInput from "./DateInput";

type FormDatePickerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;

  label?: string;
  placeholder?: string;

  minimumDate?: Date;
  maximumDate?: Date;
};

export default function FormDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select date",
  minimumDate,
  maximumDate,
}: FormDatePickerProps<T>) {
  const [show, setShow] = useState(false);

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

          <DateInput
            value={field.value}
            placeholder={placeholder}
            error={!!fieldState.error}
            onPress={() => setShow(true)}
          />

          {show && (
            <DateTimePicker
              value={field.value ?? new Date()}
              mode="date"
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              display={Platform.OS === "android" ? "calendar" : "default"}
              onValueChange={(date) => {
                field.onChange(date);
              }}
              onDismiss={() => {
                setShow(false);
              }}
            />
          )}

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
