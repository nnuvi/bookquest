import { UseFormReturn } from "react-hook-form";

import BookCoverPicker from "./BookCoverPicker";
import BookMetadataFields from "./BookMetadataFields";
import SubmitButton from "./SubmitButton";
import UserBookFields from "./UserBookFields";
import { AddBookFormData } from "@/schema/addBook.schema";
import { View } from "react-native";

type BookFormProps = {
  form: UseFormReturn<AddBookFormData>;
  onSubmit: (data: AddBookFormData) => void | Promise<void>;
  loading?: boolean;
};

export default function BookForm({ form, onSubmit, loading }: BookFormProps) {
  return (
    <View className="p-4">
      {/* 1. Pass the full form object here */}
      <BookCoverPicker form={form} />
      <View className="mb-4" />

      {/* 2. Pass the full form object here instead of just control */}
      <BookMetadataFields form={form} />

      {/* 3. Pass the full form object here instead of just control */}
      <UserBookFields form={form} />
      <View className="py-4">
        <SubmitButton loading={loading} onPress={form.handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
