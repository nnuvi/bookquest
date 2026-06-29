import { FlatList } from "react-native";

import AppText from "@/components/common/AppText";
import { BookCardItem } from "@/types/book";
import BookCard from "../book/BookCard";

type BookListProps = {
  data: BookCardItem[];
  onItemPress?: (item: BookCardItem) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
  returnBook?: (id: string) => void;
  calculateDaysSinceAdded?: (date: string) => string;
};

export default function BookList({
  data,
  onItemPress,
  refreshing = false,
  onRefresh,
}: BookListProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <BookCard item={item} onPress={onItemPress}/>}
      refreshing={refreshing}
      onRefresh={onRefresh}
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
