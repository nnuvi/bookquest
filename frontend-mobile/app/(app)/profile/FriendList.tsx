import { TouchableOpacity } from "react-native";

import { HeaderTitle } from "@/components/common/HeaderTitle";
import Screen from "@/components/common/Screen";
import UserList from "@/components/feature/user/UserList";
import EmptyState from "@/components/feedback/EmptyState";
import ErrorScreen from "@/components/feedback/ErrorScreen";
import UserCardListSkeleton from "@/components/skeleton/UserCardSkeleton";
import AppText from "@/components/ui/AppText";
import { useFriendList } from "@/hooks/user";

export default function FriendListScreen() {
  const {
    data: friendList = [],
    refetch,
    isRefetching,
    isPending,
    isError,
  } = useFriendList();

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
          renderAction={(user) => (
            <TouchableOpacity className="bg-red-500 px-3 py-2 rounded-lg">
              <AppText className="text-white">Unfriend</AppText>
            </TouchableOpacity>
          )}
        />
      )}
    </Screen>
  );
}