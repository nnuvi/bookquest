import { UseFormReturn } from "react-hook-form";

import FormDatePicker from "@/components/ui/FormDatePicker";
import FormInput from "@/components/ui/FormInput";
import FormNumberInput from "@/components/ui/FormNumberInput";
import FormTagsInput from "@/components/ui/FormTagsInput";

import { AddBookFormData } from "@/schema/addBook.schema";
import { View } from "react-native";

type BookMetadataFieldsProps = {
  form: UseFormReturn<AddBookFormData>;
  readOnlyBook?: boolean;
};

export default function BookMetadataFields({
  form,
  readOnlyBook = false,
}: BookMetadataFieldsProps) {
  const { control } = form;

  return (
    <View className="gap-3 mt-3">
      <FormInput
        control={control}
        name="book.title"
        // label="Title"
        placeholder="Book title"
        disabled={readOnlyBook}
      />

      <FormTagsInput
        control={control}
        name="book.author"
        // label="Authors"
        placeholder="Authors"
        disabled={readOnlyBook}
      />

      <FormTagsInput
        control={control}
        name="book.genres"
        // label="Genres"
        placeholder="Genres"
        disabled={readOnlyBook}
      />

      <FormInput
        control={control}
        name="book.isbn"
        // label="ISBN"
        placeholder="ISBN"
        disabled={readOnlyBook}
      />

      <FormInput
        control={control}
        name="book.publisher"
        // label="Publisher"
        placeholder="Publisher"
        disabled={readOnlyBook}
      />

      <FormDatePicker
        control={control}
        name="book.publishedDate"
        // label="Published Date"
        placeholder="Published Date"
        disabled={readOnlyBook}
      />

      <FormInput
        control={control}
        name="book.language"
        // label="Language"
        placeholder="Language"
        disabled={readOnlyBook}
      />

      <FormNumberInput
        control={control}
        name="book.pageCount"
        // label="Pages"
        placeholder="Pages"
        disabled={readOnlyBook}
      />

      <FormInput
        control={control}
        name="book.description"
        // label="Description"
        placeholder="Book description..."
        multiline
        numberOfLines={5}
        rounded="3xl"
        disabled={readOnlyBook}
      />
    </View>
  );
}
