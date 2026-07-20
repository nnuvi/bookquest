import { useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";

import Screen from "@/components/common/Screen";
import DropdownModal from "@/components/common/DropdownModal";
import { HeaderTitle } from "@/components/common/HeaderTitle";

import BookDescription from "@/components/feature/book/BookDescription";
import BookHeader from "@/components/feature/book/BookHeader";
import BookMetadata from "@/components/feature/book/BookMetadata";

import BookDetailsSkeleton from "@/components/skeleton/BookDetailsSkeleton";

import ErrorScreen from "@/components/common/ErrorScreen";
import NotFoundScreen from "@/components/common/NotFoundScreen";

import { useUserBookDetails } from "@/hooks/books";
import AppText from "@/components/ui/AppText";

export default function BookDetails() {
  const { bookId } = useGlobalSearchParams<{ bookId: string }>();

  const [modalVisible, setModalVisible] = useState(false);

  const options = ["Option 1", "Option 2", "Option 3"];

  const {
    data: userBook,
    refetch,
    isRefetching,
    isPending,
    isError,
  } = useUserBookDetails(bookId);

  const handleOptionActions = (option: string) => {
    console.log(option);
    setModalVisible(false);
  };

  return (
    <Screen>
      <HeaderTitle
        text="Book Information"
        threeDotsVisible={!!userBook}
        onPress={() => setModalVisible(true)}
      />

      {userBook && (
        <DropdownModal
          visible={modalVisible}
          options={options}
          onSelect={handleOptionActions}
          onClose={() => setModalVisible(false)}
        />
      )}

      {isPending ? (
        <BookDetailsSkeleton />
      ) : isError ? (
        <ErrorScreen
          title="Unable to load book"
          description="Please try again."
          retryText="Retry"
          onRetry={refetch}
        />
      ) : !userBook ? (
        <NotFoundScreen
          title="Book not found"
          description="We couldn't find this book."
        />
      ) : (
        <ScrollView
          className="flex-1 px-6 py-4"
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
        >
          <BookHeader
            title={userBook.book.title}
            author={userBook.book.author}
            coverImage={userBook.book.coverImage}
            availability={userBook.availability}
          />

          <BookMetadata
            items={[
              {
                label: "Genre",
                value: userBook.book.genres.join(", "),
              },
              {
                label: "Pages",
                value: userBook.book.pageCount,
              },
              {
                label: "Condition",
                value: userBook.condition,
              },
              {
                label: "ISBN",
                value: userBook.book.isbn,
              },
              {
                label: "Publisher",
                value: userBook.book.publisher,
              },
              {
                label: "Publish Date",
                value: new Date(
                  userBook?.book?.publishDate!,
                ).toLocaleDateString(),
              },
              {
                label: "Added",
                value: new Date(userBook.addedAt).toLocaleDateString(),
              },
            ]}
          />

          <BookDescription
            description={userBook.book.description}
            notes={userBook.notes}
          />
          {/* <View>
            {Array.from({ length: 50 }).map((_, i) => (
              <AppText key={i}>Row {i}</AppText>
            ))}
          </View> */}
          {/* <View className="pb-20 items-center">
            <AppText size="xl" color="text" className="mt-10">
              HELLO hello HellowWorld 1 text
            </AppText>
            <AppText size="xl" color="muted" className="mt-5">
              HELLO hello HellowWorld 2 muted plc
            </AppText>
            <AppText size="xl" color="neutral" className="mt-5">
              HELLO hello HellowWorld 3 neutral (mic plc)
            </AppText>
            <AppText size="xl" color="gray" className="mt-5">
              HELLO hello HellowWorld 4 gray muted
            </AppText>
            <AppText size="xl" color="placeholder" className="mt-5">
              HELLO hello HellowWorld 5 placeholder
            </AppText>
          </View> */}
        </ScrollView>
      )}

      {/* <Toast /> */}
    </Screen>
  );
}
