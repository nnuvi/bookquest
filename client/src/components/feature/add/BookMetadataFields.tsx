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
    <View className="gap-2">
      <FormInput
        control={control}
        name="book.title"
        label="Title"
        placeholder="Book title"
        disabled={readOnlyBook}
      />

      <FormTagsInput
        control={control}
        name="book.author"
        label="Authors"
        placeholder="J.K. Rowling"
        disabled={readOnlyBook}
      />

      <FormTagsInput
        control={control}
        name="book.genres"
        label="Genres"
        placeholder="Fantasy"
        disabled={readOnlyBook}
      />

      <FormInput
        control={control}
        name="book.isbn"
        label="ISBN"
        placeholder="978..."
        disabled={readOnlyBook}
      />

      <FormInput
        control={control}
        name="book.publisher"
        label="Publisher"
        placeholder="Publisher"
        disabled={readOnlyBook}
      />

      <FormDatePicker
        control={control}
        name="book.publishedDate"
        label="Published Date"
        disabled={readOnlyBook}
      />

      <FormInput
        control={control}
        name="book.language"
        label="Language"
        placeholder="English"
        disabled={readOnlyBook}
      />

      <FormNumberInput
        control={control}
        name="book.pageCount"
        label="Pages"
        placeholder="320"
        disabled={readOnlyBook}
      />

      <FormInput
        control={control}
        name="book.description"
        label="Description"
        placeholder="Book description..."
        multiline
        numberOfLines={5}
        rounded="3xl"
        disabled={readOnlyBook}
      />
    </View>
  );
}
