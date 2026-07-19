import { UseFormReturn } from "react-hook-form";

import BookCoverPicker from "./BookCoverPicker";
import BookMetadataFields from "./BookMetadataFields";
import SubmitButton from "./SubmitButton";
import UserBookFields from "./UserBookFields";
import { AddBookFormData } from "@/schema/addBook.schema";
import { View } from "react-native";
import BookFormSkeleton from "@/components/skeleton/BookFormSkeleton";

type BookFormProps = {
  form: UseFormReturn<AddBookFormData>;
  onSubmit: (data: AddBookFormData) => void | Promise<void>;
  loading?: boolean;
  readOnlyBook?: boolean;
};

export default function BookForm({
  form,
  onSubmit,
  loading,
  readOnlyBook = false,
}: BookFormProps) {
  if (loading) return <BookFormSkeleton />;
  return (
    <View className="p-6">
      {/* BOOK COVER */}
      <BookCoverPicker form={form} />
      <View className="mb-4" />

      {/* BOOK DATA */}
      <BookMetadataFields form={form} readOnlyBook={readOnlyBook} />

      {/* USERBOOK DATA */}
      <UserBookFields form={form} />
      <View className="py-4">
        <SubmitButton loading={loading} onPress={form.handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
