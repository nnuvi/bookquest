import { ScrollView } from "react-native";

import Screen from "@/components/common/Screen";
import { HeaderTitle } from "@/components/common/HeaderTitle";
import { zodResolver } from "@hookform/resolvers/zod";
import BookForm from "@/components/feature/add/BookForm";
import { useForm } from "react-hook-form";
import { router, useLocalSearchParams } from "expo-router";
import {
  addBookDefaultValues,
  AddBookFormData,
  AddBookSchema,
  mapBookToForm,
} from "@/schema/addBook.schema";
import { useCreateBookByISBNScan, useISBNScan } from "@/hooks/books";
import { useEffect } from "react";
// import { BookFormData, BookSchema } from "@/schema/userBook.schema";

export default function AddBookForm() {
  const { isbn } = useLocalSearchParams<{
    isbn: string;
  }>();

  const form = useForm<AddBookFormData>({
    resolver: zodResolver(AddBookSchema),
    defaultValues: addBookDefaultValues,
  });

  const { data: book, isPending } = useISBNScan(isbn);

  const createBook = useCreateBookByISBNScan();
  // const { mutateAsync: createBook, isPending } = useISBNScan(is);

  useEffect(() => {
    if (!book) return;

    form.reset(mapBookToForm(book, isbn));
  }, [book]);

  const handleSubmit = async (data: AddBookFormData) => {
    if (!book) return;

    await createBook.mutateAsync({
      bookId: book._id,
      userBook: data.userBook,
    });

    router.back();
  };

  return (
    <Screen>
      <HeaderTitle text="Add Book" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{padding: 8}}
      >
        <BookForm
          form={form}
          loading={isPending || createBook.isPending}
          onSubmit={handleSubmit}
        />
      </ScrollView>
    </Screen>
  );
}
