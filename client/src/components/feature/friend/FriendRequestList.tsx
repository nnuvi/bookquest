import { FlatList, View } from "react-native";

import EmptyState from "@/components/common/EmptyState";
import UserCard from "@/components/feature/user/UserCard";

import { FriendRequest } from "@/types/user";
import { LOG_SCOPE, logger } from "@/lib/logger";
import Button from "@/components/ui/Button";
import FriendRequestAction from "./FriendRequestAction";
import FriendAction from "./FriendAction";

interface FriendRequestListProps {
  requests: FriendRequest[];
  refreshing?: boolean;
  onRefresh?: () => void;
}

export default function FriendRequestList({
  requests,
  refreshing = false,
  onRefresh,
}: FriendRequestListProps) {
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
          actionButton="right"
          action={
            <FriendRequestAction fullWidth={false} requestId={item._id} />
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
        // paddingVertical: 8,
        paddingBottom: 150,
        paddingHorizontal: 16,
      }}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
    />
  );
}
