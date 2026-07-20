import { FlatList, View } from "react-native";

import EmptyState from "@/components/common/EmptyState";
import BookCard from "@/components/feature/book/BookCard";

import { BorrowRequest } from "@/types/borrow";
import { BookCardItem } from "@/types/book";
import { LOG_SCOPE, logger } from "@/lib/logger";
import Button from "@/components/ui/Button";
import BorrowRequestAction from "./BorrowActionButton";
import { router } from "expo-router";

interface BorrowRequestListProps {
  requests: BookCardItem[];

  refreshing?: boolean;
  onRefresh?: () => void;

  onBookPress?: (request: BorrowRequest) => void;
}

export default function BorrowRequestList({
  requests,
  // onApprove,
  // onDecline,
  refreshing = false,
  onRefresh,
  onBookPress,
}: BorrowRequestListProps) {
  // logger.debug(LOG_SCOPE.query, "Fetched borrow requests (item): ", {
  //   requests,
  // });
  return (
    <FlatList
      data={requests}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListEmptyComponent={
        <EmptyState
          title="No Borrow Requests Received"
          description="Received borrow requests will appear here."
        />
      }
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingBottom: 150,
      }}
      renderItem={({ item }) => (
        <BookCard
          item={item}
          // onPress={() => onBookPress?.(item)}
          actionButton="bottom"
          action={<BorrowRequestAction requestId={item.id} fullWidth />}
          onPress={() => router.push(`/request/${item.id}`)} //rqq
        />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
    />
  );
}
