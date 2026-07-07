import { useState } from "react";
import { router } from "expo-router";

import Screen from "@/components/common/Screen";

import BookList from "@/components/feature/book/BookList";
import { ProfileHeader } from "@/components/feature/profile/ProfileHeader";
import ProfileTabs from "@/components/feature/profile/ProfileTabs";

import EmptyState from "@/components/common/EmptyState";
import ErrorScreen from "@/components/common/ErrorScreen";
import NotFoundScreen from "@/components/common/NotFoundScreen";

import BookCardSkeleton from "@/components/skeleton/BookCardsSkeleton";
import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";

import { useBorrowedBooks, useLentBooks, useMyBooks } from "@/hooks/books";
import { useMyProfile } from "@/hooks/user";

type TabType = "list" | "borrowed" | "lent";

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("list");

  const {
    data: user,
    refetch: refetchUser,
    isPending: isProfilePending,
    isError: isProfileError,
    isRefetching: isProfileRefetching,
  } = useMyProfile();

  const {
    data: userBooks = [],
    refetch: refetchUserBooks,
    isPending: isUserBooksPending,
    isRefetching: isUserBooksRefetching,
  } = useMyBooks();

  const {
    data: borrowedBooks = [],
    refetch: refetchBorrowedBooks,
    isPending: isBorrowedBooksPending,
    isRefetching: isBorrowedBooksRefetching,
  } = useBorrowedBooks();

  const {
    data: lentBooks = [],
    refetch: refetchLentBooks,
    isPending: isLentBooksPending,
    isRefetching: isLentBooksRefetching,
  } = useLentBooks();

  const onRefresh = async () => {
    await Promise.allSettled([
      refetchUser(),
      refetchUserBooks(),
      refetchBorrowedBooks(),
      refetchLentBooks(),
    ]);
  };

  const refreshing =
    isProfileRefetching ||
    isUserBooksRefetching ||
    isBorrowedBooksRefetching ||
    isLentBooksRefetching;

  const booksPending =
    isUserBooksPending || isBorrowedBooksPending || isLentBooksPending;

  const currentData =
    activeTab === "list"
      ? userBooks
      : activeTab === "borrowed"
        ? borrowedBooks
        : lentBooks;

  const emptyState = {
    list: {
      title: "No Books Yet",
      description: "Start by adding your first book.",
    },
    borrowed: {
      title: "Nothing Borrowed",
      description: "Borrowed books will appear here.",
    },
    lent: {
      title: "Nothing Lent",
      description: "Books you've lent to others will appear here.",
    },
  }[activeTab];

  return (
    <Screen>
      {isProfilePending ? (
        <ProfileSkeleton />
      ) : isProfileError ? (
        <ErrorScreen
          title="Unable to load profile"
          description="Please try again."
          retryText="Retry"
          onRetry={refetchUser}
        />
      ) : !user ? (
        <NotFoundScreen
          title="Profile not found"
          description="We couldn't find this profile."
        />
      ) : (
        <>
          <ProfileHeader user={user} bookNo={userBooks.length} />

          <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />

          {booksPending ? (
            <BookCardSkeleton />
          ) : (
            <BookList
              data={currentData}
              onItemPress={(item) =>
                router.push(`/books/UserBookDetails/${item.userBookId}`)
              }
              refreshing={refreshing}
              onRefresh={onRefresh}
              contentContainerStyle={{
                paddingBottom: 70,
              }}
              listEmptyComponent={
                <EmptyState
                  title={emptyState.title}
                  description={emptyState.description}
                />
              }
            />
          )}
        </>
      )}
    </Screen>
  );
}
