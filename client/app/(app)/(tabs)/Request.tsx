import { useEffect, useState } from "react";

import Screen from "@/components/common/Screen";
import { HeaderTitle } from "@/components/common/HeaderTitle";

import RequestTabs, {
  RequestTab,
} from "@/components/feature/request/RequestTabs";
import UserList from "@/components/feature/user/UserList";
import BookList from "@/components/feature/book/BookList";

import EmptyState from "@/components/feedback/EmptyState";
import ErrorScreen from "@/components/feedback/ErrorScreen";

import UserListSkeleton from "@/components/skeleton/UserCardSkeleton";
import BookCardSkeleton from "@/components/skeleton/BookCardsSkeleton";

import { useFriendRequest, useRespondFriendRequest } from "@/hooks/friend";
import { useBorrowRequest, useBorrowSentRequest } from "@/hooks/borrow";
import NotFoundScreen from "@/components/feedback/NotFoundScreen";
import FriendRequestList from "@/components/feature/request/FriendRequestList";
import BorrowRequestList from "@/components/feature/request/BorrowRequestList";
import BorrowSentRequestList from "@/components/feature/request/BorrowSentRequestList";
import { LOG_SCOPE, logger } from "@/lib/logger";
import { useQueryClient } from "@tanstack/react-query";

export default function Requests() {
  const [tab, setTab] = useState<RequestTab>("received");

  const friend = useFriendRequest();
  const received = useBorrowRequest();
  const sent = useBorrowSentRequest();

  // useEffect(() => {
  //   console.log(
  //     "Cache:",
  //     queryClient
  //       .getQueryCache()
  //       .getAll()
  //       .map((q) => q.queryKey),
  //   );
  // }, [friend.status, received.status, sent.status]);

  // useEffect(() => {
  //   console.log("Requests screen data:", friend.data?.length);
  // }, [friend.data]);

  const respondMutation = useRespondFriendRequest();

  const tabs = {
    friends: {
      query: friend,
      skeleton: <UserListSkeleton />,
      render: () => (
        <FriendRequestList
          requests={friend.data ?? []}
          refreshing={friend.isRefetching}
          onRefresh={friend.refetch}
          onAccept={(id) =>
            respondMutation.mutate({
              requestId: id,
              action: "accepted",
            })
          }
          onDecline={(id) =>
            respondMutation.mutate({
              requestId: id,
              action: "declined",
            })
          }
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
          onApprove={() => {}}
          onDecline={() => {}}
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
          onCancel={() => {}}
        />
      ),
    },
  } as const;

  const current = tabs[tab];
  const { isPending, isError, refetch } = current.query;

  logger.debug(LOG_SCOPE.query, "Query state", {
    tab: `${tab}`,
    status: current.query.status,
    isPending: current.query.isPending,
    isFetching: current.query.isFetching,
    isSuccess: current.query.isSuccess,
    isError: current.query.isError,
    error: current.query.error,
  });

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
