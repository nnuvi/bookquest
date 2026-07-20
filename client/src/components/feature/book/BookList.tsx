import { FlatList, StyleProp, View, ViewStyle } from "react-native";

import AppText from "@/components/ui/AppText";
import { BookCardItem } from "@/types/book";
import BookCard from "../book/BookCard";
import { ReactElement, ReactNode } from "react";
import BorrowAction from "../borrow/BorrowAction";
import { Colors } from "@/constants/Colors";

type BookListProps = {
  data: BookCardItem[];
  onItemPress?: (item: BookCardItem) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
  returnBook?: (id: string) => void;
  actionButton?: "bottom" | "right" | "none";
  action?: (userBookId: string) => ReactNode;
  calculateDaysSinceAdded?: (date: string) => string;
  contentContainerStyle?: StyleProp<ViewStyle>;
  listEmptyComponent?: ReactElement;
};

export default function BookList({
  data,
  onItemPress,
  refreshing = false,
  onRefresh,
  actionButton = "none",
  action,
  contentContainerStyle,
  listEmptyComponent,
}: BookListProps) {
  return (
    <FlatList
      data={data}
      style={{ flex: 1 }}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <BookCard
          item={item}
          onPress={onItemPress}
          action={action?.(item.userBookId!)}
          actionButton={actionButton}
        />
      )}
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={[
        {
          // flexGrow: 1,
          padding: 12,
          paddingBottom: 20,
          paddingVertical: 12,
          marginBottom: 12,
          // backgroundColor: Colors.backgroundDark
        },
        contentContainerStyle,
      ]}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      ListEmptyComponent={
        listEmptyComponent ?? (
          <AppText className="text-center mt-5">No books available.</AppText>
        )
      }
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
}
