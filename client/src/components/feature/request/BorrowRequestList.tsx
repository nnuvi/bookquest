import { FlatList, View } from "react-native";

import EmptyState from "@/components/feedback/EmptyState";
import BookCard from "@/components/feature/book/BookCard";

import { BorrowRequest } from "@/types/borrow";
import { BookCardItem } from "@/types/book";
import { LOG_SCOPE, logger } from "@/lib/logger";
import Button from "@/components/ui/Button";

interface BorrowRequestListProps {
  requests: BookCardItem[];

  onApprove: (id: string) => void;
  onDecline: (id: string) => void;

  refreshing?: boolean;
  onRefresh?: () => void;

  onBookPress?: (request: BorrowRequest) => void;
}

export default function BorrowRequestList({
  requests,
  onApprove,
  onDecline,
  refreshing = false,
  onRefresh,
  onBookPress,
}: BorrowRequestListProps) {
  logger.debug(
    LOG_SCOPE.query,
    "Fetched borrow sent requests (item): ",
    requests,
  );
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
        paddingVertical: 8,
        paddingBottom: 150,
      }}
      renderItem={({ item }) => (
        <BookCard
          item={item}
          //   onPress={() => onBookPress?.(item)}
          action={
            <View className="flex-row gap-3 px-4 pb-4">
              <View className="flex-1">
                <Button
                  title="Approve"
                  variant="secondary"
                  size="base"
                  onPress={() => onApprove(item.id)}
                />
              </View>

              <View className="flex-1">
                <Button
                  title="Decline"
                  variant="neutral"
                  size="base"
                  onPress={() => onDecline(item.id)}
                />
              </View>
            </View>
          }
        />
      )}
    />
  );
}
