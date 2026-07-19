import Ionicons from "@expo/vector-icons/Ionicons";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Pressable, View } from "react-native";

import AppText from "./AppText";
import Select from "./Select";
import SelectModal from "./SelectModal";
import { useState } from "react";

type Option<T extends string> = {
  label: string;
  value: T;
};

type FormSelectProps<
  TFieldValues extends FieldValues,
  TValue extends string,
> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;

  label?: string;
  placeholder?: string;

  options: readonly Option<TValue>[];

  disabled?: boolean;

  onPress?: (
    options: readonly Option<TValue>[],
    value: TValue | undefined,
    onChange: (value: TValue) => void,
  ) => void;
};

export default function FormSelect<
  TFieldValues extends FieldValues,
  TValue extends string,
>({
  control,
  name,
  label,
  placeholder = "Select",
  disabled = false,
  options,
  onPress,
}: FormSelectProps<TFieldValues, TValue>) {
  const [visible, setVisible] = useState(false);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const selected = options.find((o) => o.value === field.value);
        const selectedLabel = selected?.label ?? "";
      

        return (
          <View className="mb-5">
            {label && (
              <AppText size="lg" weight="semibold" className="mb-2">
                {label}
              </AppText>
            )}

            <Select
              value={selectedLabel}
              placeholder={placeholder}
              error={!!fieldState.error}
              disabled={disabled}
              onPress={() => setVisible(true)}
              showFloatingLabel={true}
            />

            <SelectModal
              visible={visible}
              title={label}
              options={options}
              value={field.value}
              onClose={() => setVisible(false)}
              // onSelect={field.onChange}
              onSelect={(value) => {
                field.onChange(value);
                setVisible(false);
              }}
            />

            {!!fieldState.error && (
              <AppText className="mt-1 text-sm text-danger">
                {fieldState.error.message}
              </AppText>
            )}
          </View>
        );
      }}
    />
  );
}
