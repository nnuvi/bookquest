import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View } from "react-native";
import { UseFormReturn } from "react-hook-form";

import BookCover from "@/components/ui/BookCover";

import { pickImage } from "@/lib/image";
import { BookFormValues } from "@/schema/book.schema";
import { AddBookFormData } from "@/schema/addBook.schema";

type BookCoverPickerProps = {
  image?: string;
  form: UseFormReturn<AddBookFormData>;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

export default function BookCoverPicker({
  image,
  form,
  size = "xl",
}: BookCoverPickerProps) {
  //   const coverImage = form.watch("coverImage");

  async function handlePress() {
    try {
      const pickedImage = await pickImage();

      if (!pickedImage) return;

      form.setValue("book.coverImage", pickedImage, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Pressable onPress={handlePress} className="self-center">
      <View>
        <BookCover
          image={form.watch("book.coverImage")?.uri ?? image}
          size={size}
        />

        <View className="absolute bottom-2 right-2 rounded-full bg-primary p-1 border border-white">
          <Ionicons name="camera" size={14} color="white" />
        </View>
      </View>
    </Pressable>
  );
}
