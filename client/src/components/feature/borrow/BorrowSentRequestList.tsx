import { FlatList } from "react-native";

import EmptyState from "@/components/common/EmptyState";
import BookCard from "@/components/feature/book/BookCard";

import { BookCardItem } from "@/types/book";
import { BorrowRequest } from "@/types/borrow";

import { LOG_SCOPE, logger } from "@/lib/logger";
import BorrowRequestAction from "./BorrowActionButton";
import { router } from "expo-router";

interface BorrowSentRequestListProps {
  requests: BookCardItem[];

  refreshing?: boolean;
  onRefresh?: () => void;

  onCancel?: (id: string) => void;
  onBookPress?: (request: BorrowRequest) => void;
}

export default function BorrowRequestSentList({
  requests,
  refreshing = false,
  onRefresh,
  onCancel,
  onBookPress,
}: BorrowSentRequestListProps) {
  // logger.debug(
  //   LOG_SCOPE.query,
  //   "Fetched borrow requests sent (item): ",
  //   requests,
  // );
  return (
    <FlatList
      data={requests}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListEmptyComponent={
        <EmptyState
          title="No Borrow Requests Sent"
          description="Sent borrow requests will appear here."
        />
      }
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: 8,
        paddingBottom: 150,
      }}
      renderItem={({ item }) => (
        <BookCard
          item={item}
            onPress={() => router.push(`/books/UserBookDetails/${item.userBookId}`)}
          actionButton="bottom"
          action={<BorrowRequestAction mode="sent" requestId={item.id}/>}
        />
      )}
    />
  );
}
