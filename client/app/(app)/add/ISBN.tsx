import { router } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Screen from "@/components/common/Screen";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import { View } from "react-native";
import { ISBNFormData, ISBNSchema } from "@/schema/book.schema";

export default function ISBN() {
  const form = useForm<ISBNFormData>({
    resolver: zodResolver(ISBNSchema),
    defaultValues: {
      isbn: "",
    },
  });

  function onSubmit(data: ISBNFormData) {
    router.push({
      pathname: "/add/Form",
      params: {
        isbn: data.isbn,
      },
    });
  }

  return (
    <Screen>
      <View className="p-6 justify-center">
        <FormInput
          control={form.control}
          name="isbn"
          label="ISBN"
          placeholder="9780140177398"
          keyboardType="numeric"
        />

        <Button title="Search Book"  onPress={form.handleSubmit(onSubmit)} />
      </View>
    </Screen>
  );
}
