import { FlatList, StyleProp, ViewStyle } from "react-native";

import AppText from "@/components/ui/AppText";
import { BookCardItem } from "@/types/book";
import BookCard from "../book/BookCard";
import { ReactElement, ReactNode } from "react";

type BookListProps = {
  data: BookCardItem[];
  onItemPress?: (item: BookCardItem) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
  returnBook?: (id: string) => void;
  calculateDaysSinceAdded?: (date: string) => string;
  contentContainerStyle?: StyleProp<ViewStyle>;
  listEmptyComponent?: ReactElement;
};

export default function BookList({
  data,
  onItemPress,
  refreshing = false,
  onRefresh,
  contentContainerStyle,
  listEmptyComponent,
}: BookListProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <BookCard item={item} onPress={onItemPress} />}
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={[
        {
          paddingBottom: 20,
        },
        contentContainerStyle,
      ]}
      ListEmptyComponent={
        listEmptyComponent ?? (
          <AppText className="text-center mt-5">No books available.</AppText>
        )
      }
      style={{ flex: 1 }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
}
