import { FlatList } from "react-native";

import AppText from "@/components/common/AppText";
import BookCard from "../book/BookCard";
import { BookCardItem, UserBook } from "@/types/book";

type BookListProps = {
  data: BookCardItem[];
  returnBook?: (id: string) => void;
  calculateDaysSinceAdded?: (date: string) => string;
};

export default function BookList({ data }: BookListProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => <BookCard item={item} />}
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      ListEmptyComponent={
        <AppText className="text-center mt-5">No books available.</AppText>
      }
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
}
