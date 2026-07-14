import { useState } from "react";

import { HeaderTitle } from "@/components/common/HeaderTitle";
import Screen from "@/components/common/Screen";

import RequestTabs, {
  RequestTab,
} from "@/components/feature/request/RequestTabs";

import ErrorScreen from "@/components/common/ErrorScreen";

import BookCardSkeleton from "@/components/skeleton/BookCardsSkeleton";
import UserListSkeleton from "@/components/skeleton/UserCardSkeleton";

import BorrowRequestList from "@/components/feature/borrow/BorrowRequestList";
import BorrowSentRequestList from "@/components/feature/borrow/BorrowSentRequestList";
import FriendRequestList from "@/components/feature/friend/FriendRequestList";
import { useBorrowRequest, useBorrowSentRequest } from "@/hooks/borrow";
import { useFriendRequest } from "@/hooks/friend";
import { LOG_SCOPE, logger } from "@/lib/logger";

export default function Requests() {
  const [tab, setTab] = useState<RequestTab>("received");

  const friend = useFriendRequest();
  const received = useBorrowRequest();
  const sent = useBorrowSentRequest();

  const tabs = {
    friends: {
      query: friend,
      skeleton: <UserListSkeleton />,
      render: () => (
        <FriendRequestList
          requests={friend.data ?? []}
          refreshing={friend.isRefetching}
          onRefresh={friend.refetch}
        />
      ),
    },

    received: {
      query: received,
      skeleton: <BookCardSkeleton />,
      render: () => (
        <BorrowRequestList
          requests={received.data ?? []}
          refreshing={received.isRefetching}
          onRefresh={received.refetch}
        />
      ),
    },

    sent: {
      query: sent,
      skeleton: <BookCardSkeleton />,
      render: () => (
        <BorrowSentRequestList
          requests={sent.data ?? []}
          refreshing={sent.isRefetching}
          onRefresh={sent.refetch}
        />
      ),
    },
  } as const;

  const current = tabs[tab];
  const { isPending, isError, refetch } = current.query;

  // logger.debug(LOG_SCOPE.query, "Query state", {
  //   tab: `${tab}`,
  //   status: current.query.status,
  //   data: current.query.data,
  //   isPending: current.query.isPending,
  //   isFetching: current.query.isFetching,
  //   isSuccess: current.query.isSuccess,
  //   isError: current.query.isError,
  //   error: current.query.error,
  // });

//   console.log(received.error);
// console.log(current.query.error);

  return (
    <Screen>
      <HeaderTitle text="Requests" />

      <RequestTabs selected={tab} onChange={setTab} />

      {isError ? (
        <ErrorScreen
          title="Unable to load requests"
          description="Please try again."
          retryText="Retry"
          onRetry={refetch}
        />
      ) : isPending ? (
        current.skeleton
      ) : (
        current.render()
      )}
    </Screen>
  );
}
