import { FlatList } from "react-native";

import EmptyState from "@/components/common/EmptyState";

import BookCard from "./BookCard";

import { useResponsive } from "@/hooks/useResponsive";
import { BookCardItem } from "@/types/book";
import BookGridItem from "./BookGridItem";

type BookGridProps = {
  books: BookCardItem[];

  refreshing?: boolean;
  onRefresh?: () => void;

  onBookPress?: (book: BookCardItem) => void;

  emptyTitle?: string;
  emptyDescription?: string;

  ListHeaderComponent?: React.ReactElement;
};

export default function BookGrid({
  books,
  refreshing = false,
  onRefresh,
  onBookPress,
  emptyTitle = "No Books Found",
  emptyDescription = "There are no books to display.",
  ListHeaderComponent,
}: BookGridProps) {
  const { numColumns } = useResponsive();

  return (
    <FlatList
      key={numColumns}
      data={books}
      numColumns={numColumns}
      refreshing={refreshing}
      onRefresh={onRefresh}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="p-4 pb-12"
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={
        <EmptyState title={emptyTitle} description={emptyDescription} />
      }
      renderItem={({ item }) => (
        <BookGridItem item={item} onPress={() => onBookPress?.(item)} />
      )}
    />
  );
}
