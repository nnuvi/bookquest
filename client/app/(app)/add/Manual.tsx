import { ScrollView } from "react-native";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Screen from "@/components/common/Screen";
import { HeaderTitle } from "@/components/common/HeaderTitle";
import BookForm from "@/components/feature/add/BookForm";

import {
  AddBookSchema,
  AddBookFormData,
  addBookDefaultValues,
} from "@/schema/addBook.schema";

import { useCreateBook } from "@/hooks/books";

export default function ManualAddBookScreen() {
  const form = useForm<AddBookFormData>({
    resolver: zodResolver(AddBookSchema),
    defaultValues: addBookDefaultValues,
  });

  const { mutateAsync: createBook, isPending } = useCreateBook();

  async function handleSubmit(data: AddBookFormData) {
    await createBook(data);

    router.back();
  }

  return (
    <Screen>
      <HeaderTitle text="Add Book" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <BookForm
          form={form}
          onSubmit={handleSubmit}
          loading={isPending}
        />
      </ScrollView>
    </Screen>
  );
}