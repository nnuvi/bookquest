import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import BookList from "@/components/feature/book/BookList";
import { ProfileHeader } from "@/components/feature/profile/ProfileHeader";
import ProfileTabs from "@/components/feature/profile/ProfileTabs";
import { useBorrowedBooks, useLentBooks, useMyBooks } from "@/hooks/books";
import { useMyProfile } from "@/hooks/user";

const ProfileScreen = () => {
  type TabType = "list" | "borrowed" | "lent";

  const [activeTab, setActiveTab] = useState<TabType>("list");
  const { data: user } = useMyProfile();
  const { data: userBooks = [] } = useMyBooks();
  const { data: borrowedBooks = [] } = useBorrowedBooks();
  const { data: lentBooks = [] } = useLentBooks();

  // console.log("My Books:", userBooks);
  // console.log("Borrowed Books:", borrowedBooks);
  // console.log("Lent Books:", lentBooks);

  const currentData =
    activeTab === "list"
      ? userBooks
      : activeTab === "borrowed"
        ? borrowedBooks
        : lentBooks;

  console.log("activeTab: ", activeTab);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ProfileHeader user={user} bookNo={userBooks?.length ?? 0} />

      <ProfileTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        // onAddPress={() => setModalVisible(true)}
      />

      <BookList data={currentData} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
