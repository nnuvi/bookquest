import { FlatList } from "react-native";

import EmptyState from "@/components/common/EmptyState";

import BookCard from "./BookCard";

import { useResponsive } from "@/hooks/useResponsive";
import { BookCardItem } from "@/types/book";
import BookGridItem from "./BookGridItem";
import { Colors } from "@/constants/Colors";

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
      style={{
        flex: 1,
        width: "100%",
        // backgroundColor: Colors.backgroundDark,
      }}
      key={numColumns}
      data={books}
      numColumns={numColumns}
      refreshing={refreshing}
      onRefresh={onRefresh}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      // contentContainerClassName="p-4 pb-22"
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: 8,
        paddingBottom: 80,
      }}
      columnWrapperStyle={{
        justifyContent: "flex-start",
        // backgroundColor: Colors.accent,
      }}
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
