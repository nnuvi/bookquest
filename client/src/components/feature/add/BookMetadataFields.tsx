import { UseFormReturn } from "react-hook-form";

import FormDatePicker from "@/components/ui/FormDatePicker";
import FormInput from "@/components/ui/FormInput";
import FormNumberInput from "@/components/ui/FormNumberInput";
import FormTagsInput from "@/components/ui/FormTagsInput";

import { AddBookFormData } from "@/schema/addBook.schema";
import { View } from "react-native";

type BookMetadataFieldsProps = {
  form: UseFormReturn<AddBookFormData>;
};

export default function BookMetadataFields({ form }: BookMetadataFieldsProps) {
  const { control } = form;

  return (
    <View className="gap-2">
      <FormInput
        control={control}
        name="book.title"
        label="Title"
        placeholder="Book title"
      />

      <FormTagsInput
        control={control}
        name="book.author"
        label="Authors"
        placeholder="J.K. Rowling"
      />

      <FormTagsInput
        control={control}
        name="book.genres"
        label="Genres"
        placeholder="Fantasy"
      />

      <FormInput
        control={control}
        name="book.isbn"
        label="ISBN"
        placeholder="978..."
      />

      <FormInput
        control={control}
        name="book.publisher"
        label="Publisher"
        placeholder="Publisher"
      />

      <FormDatePicker
        control={control}
        name="book.publishedDate"
        label="Published Date"
      />

      <FormInput
        control={control}
        name="book.language"
        label="Language"
        placeholder="English"
      />

      <FormNumberInput
        control={control}
        name="book.pageCount"
        label="Pages"
        placeholder="320"
      />

      <FormInput
        control={control}
        name="book.description"
        label="Description"
        placeholder="Book description..."
        multiline
        numberOfLines={5}
        rounded="3xl"
      />
    </View>
  );
}
