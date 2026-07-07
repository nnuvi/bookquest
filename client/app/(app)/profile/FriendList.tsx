import { TouchableOpacity } from "react-native";

import { HeaderTitle } from "@/components/common/HeaderTitle";
import Screen from "@/components/common/Screen";
import UserList from "@/components/feature/user/UserList";
import EmptyState from "@/components/common/EmptyState";
import ErrorScreen from "@/components/common/ErrorScreen";
import UserCardListSkeleton from "@/components/skeleton/UserCardSkeleton";
import AppText from "@/components/ui/AppText";
import { useFriendList } from "@/hooks/user";
import { useRemoveFriend } from "@/hooks/friend";
import Button from "@/components/ui/Button";

export default function FriendListScreen() {
  const {
    data: friendList = [],
    refetch,
    isRefetching,
    isPending,
    isError,
  } = useFriendList();

  const removeFriendMutation = useRemoveFriend();

  return (
    <Screen>
      <HeaderTitle text="Friends" />

      {isPending ? (
        <UserCardListSkeleton />
      ) : isError ? (
        <ErrorScreen
          title="Unable to load friends"
          description="Please try again."
          retryText="Retry"
          onRetry={refetch}
        />
      ) : friendList.length === 0 ? (
        <EmptyState
          title="No Friends Yet"
          description="When you add friends, they'll appear here."
        />
      ) : (
        <UserList
          users={friendList}
          refreshing={isRefetching}
          onRefresh={refetch}
          actionButton="right"
          renderAction={(user) => (
            <Button
              title={"Unfriend"}
              variant="neutral"
              onPress={() => removeFriendMutation.mutate(user._id)}
            />
          )}
        />
      )}
    </Screen>
  );
}
