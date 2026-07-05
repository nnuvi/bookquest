import { FlatList, View } from "react-native";

import EmptyState from "@/components/feedback/EmptyState";
import UserCard from "@/components/feature/user/UserCard";

import { FriendRequest } from "@/types/user";
import { LOG_SCOPE, logger } from "@/lib/logger";
import Button from "@/components/ui/Button";

interface FriendRequestListProps {
  requests: FriendRequest[];

  onAccept: (id: string) => void;
  onDecline: (id: string) => void;

  refreshing?: boolean;
  onRefresh?: () => void;
}

export default function FriendRequestList({
  requests,
  onAccept,
  onDecline,
  refreshing = false,
  onRefresh,
}: FriendRequestListProps) {
  //   logger.debug(LOG_SCOPE.query, "Fetched friend requests (item): ", requests);
  console.log(
    "FriendRequestList render:",
    requests.map((r) => r.from.username),
  );
  return (
    <FlatList
      data={requests}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <UserCard
          user={item.from}
          action={
            <View className="flex-row gap-2 p-2">
              <Button
                title="Accept"
                variant="secondary"
                onPress={() => onAccept(item._id)}
              />

              <Button
                title="Decline"
                variant="neutral"
                onPress={() => onDecline(item._id)}
              />
            </View>
          }
        />
      )}
      ListEmptyComponent={
        <EmptyState
          title="No Friend Requests"
          description="Friend requests will appear here."
        />
      }
      refreshing={refreshing}
      onRefresh={onRefresh}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: 8,
        paddingBottom: 150,
      }}
    />
  );
}
