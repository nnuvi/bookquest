import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import BookList from "@/components/feature/book/BookList";
import { ProfileHeader } from "@/components/feature/profile/ProfileHeader";
import ProfileTabs from "@/components/feature/profile/ProfileTabs";
import { useBorrowedBooks, useLentBooks, useMyBooks } from "@/hooks/books";
import { useMyProfile } from "@/hooks/user";
import Loading from "@/components/common/Loading";

const ProfileScreen = () => {
  type TabType = "list" | "borrowed" | "lent";

  const [activeTab, setActiveTab] = useState<TabType>("list");
  const {
    data: user,
    refetch: refetchUser,
    isRefetching: refreshingUser,
    isLoading,
  } = useMyProfile();

  const {
    data: userBooks = [],
    refetch: refetchUserBooks,
    isRefetching: refreshingUserBooks,
  } = useMyBooks();

  const {
    data: borrowedBooks = [],
    refetch: refetchBorrowedBooks,
    isRefetching: refreshingBorrowedBooks,
  } = useBorrowedBooks();

  const {
    data: lentBooks = [],
    refetch: refetchLentBooks,
    isRefetching: refreshingLentBooks,
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
    refreshingUser ||
    refreshingUserBooks ||
    refreshingBorrowedBooks ||
    refreshingLentBooks;

  const currentData =
    activeTab === "list"
      ? userBooks
      : activeTab === "borrowed"
        ? borrowedBooks
        : lentBooks;

  console.log("activeTab: ", activeTab);

  if (isLoading) return <Loading />;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProfileHeader user={user} bookNo={userBooks?.length ?? 0} />
      <ProfileTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        // onAddPress={() => setModalVisible(true)}
      />

      <BookList
        data={currentData}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
