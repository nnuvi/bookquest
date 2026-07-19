import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { View } from "react-native";

import AppText from "./AppText";
import Input from "./Input";

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;

  label?: string;

  rounded?:
    | "xs"
    | "sm"
    | "md"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "full";

  placeholder?: string;

  multiline?: boolean;
  numberOfLines?: number;

  secureTextEntry?: boolean;

  disabled?: boolean;

  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";

  autoCapitalize?: "none" | "sentences" | "words" | "characters";

  autoCorrect?: boolean;

  returnKeyType?: "done" | "go" | "next" | "search" | "send";

  onSubmitEditing?: () => void;
};

export default function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  rounded,
  disabled = false,
  ...props
}: FormInputProps<T>) {
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
            {...props}
            value={field.value?.toString() ?? ""}
            // onChangeText={field.onChange}
            onChangeText={(text) => {
              console.log("typed:", text);
              field.onChange(text);
            }}
            onBlur={field.onBlur}
            error={!!fieldState.error}
            disabled={disabled}
            rounded={rounded}
          />

          {fieldState.error && (
            <AppText size="sm" color="red" className="mt-1">
              {fieldState.error.message}
            </AppText>
          )}
        </View>
      )}
    />
  );
}
