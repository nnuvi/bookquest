import Screen from "@/components/common/Screen";
import BookList from "@/components/feature/book/BookList";
import { ProfileHeader } from "@/components/feature/profile/ProfileHeader";
import ProfileTabs from "@/components/feature/profile/ProfileTabs";
import EmptyState from "@/components/common/EmptyState";
import ErrorScreen from "@/components/common/ErrorScreen";
import NotFoundScreen from "@/components/common/NotFoundScreen";
import BookCardSkeleton from "@/components/skeleton/BookCardsSkeleton";
import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";
import { useUserBooks } from "@/hooks/books";
import { useUserProfile } from "@/hooks/user";
import { useGlobalSearchParams } from "expo-router";
import FriendAction from "@/components/feature/friend/FriendAction";

export default function ProfileScreen() {
  const { profileId } = useGlobalSearchParams<{ profileId: string }>();

  const {
    data: user,
    refetch: refetchProfile,
    isPending: isProfilePending,
    isError: isProfileError,
    isRefetching: isProfileRefetching,
  } = useUserProfile(profileId);

  const {
    data: userBooks = [],
    refetch: refetchBooks,
    isPending: isBooksPending,
    isError: isBooksError,
    isRefetching: isBooksRefetching,
  } = useUserBooks(profileId);

  const onRefresh = async () => {
    await Promise.allSettled([refetchProfile(), refetchBooks()]);
  };

  const refreshing = isProfileRefetching || isBooksRefetching;

  return (
    <Screen>
      {isProfilePending ? (
        <ProfileSkeleton />
      ) : isProfileError ? (
        <ErrorScreen
          title="Unable to load profile"
          description="Please try again."
          retryText="Retry"
          onRetry={refetchProfile}
        />
      ) : !user ? (
        <NotFoundScreen
          title="Profile not found"
          description="We couldn't find this profile."
        />
      ) : (
        <>
          <ProfileHeader
            user={user}
            bookNo={userBooks.length}
            currentUser={false}
            action={<FriendAction userId={user._id} />}
          />

          <ProfileTabs activeTab="list" currentUser={false} />

          {isBooksPending ? (
            <BookCardSkeleton />
          ) : isBooksError ? (
            <ErrorScreen
              title="Unable to load books"
              description="We couldn't load this user's books."
              retryText="Retry"
              onRetry={refetchBooks}
            />
          ) : (
            <BookList
              data={userBooks}
              refreshing={refreshing}
              onRefresh={onRefresh}
              listEmptyComponent={
                <EmptyState
                  title="No Books Yet"
                  description="This user hasn't added any books yet."
                />
              }
              contentContainerStyle={{
                paddingBottom: 70,
              }}
            />
          )}
        </>
      )}
    </Screen>
  );
}
