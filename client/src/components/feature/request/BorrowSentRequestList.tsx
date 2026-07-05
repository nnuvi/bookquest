import { FlatList, View } from "react-native";

import EmptyState from "@/components/feedback/EmptyState";
import BookCard from "@/components/feature/book/BookCard";
import AppText from "@/components/ui/AppText";

import { BorrowRequest, BorrowRequestStatus } from "@/types/borrow";
import { BookCardItem } from "@/types/book";

import Screen from "@/components/common/Screen";
import { LOG_SCOPE, logger } from "@/lib/logger";
import Button from "@/components/ui/Button";

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
  logger.debug(LOG_SCOPE.query, "Fetched borrow requests (item): ", requests);
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
          action={
            <View className="px-4 pb-3">
              <AppText size="sm">
                Owner{" "}
                <AppText weight="semibold">{item.owner?.fullName}</AppText>
              </AppText>

              <AppText size="sm" className="mt-2">
                Status: {item.borrowRequestStatus?.toUpperCase()}
              </AppText>

              {item.borrowRequestStatus === "pending" && (
                <View className="mt-3">
                  <Button
                    title="Cancel Request"
                    variant="danger"
                    onPress={() => onCancel?.(item.borrowRequestId!)}
                  />
                </View>
              )}
            </View>
          }
        />
      )}
    />
  );
}
