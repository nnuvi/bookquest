import { useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, RefreshControl, ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";

import AppText from "@/components/ui/AppText";
import DropdownModal from "@/components/common/DropdownModal";
import { HeaderTitle } from "@/components/common/HeaderTitle";
// import { UserBook } from "@/types/book";
import Loading from "@/components/common/Loading";
import Screen from "@/components/common/Screen";
import { useBookDetails } from "@/hooks/books";
import { SafeAreaView } from "react-native-safe-area-context";
import BookMetadata from "@/components/feature/book/BookMetadata";
import BookDescription from "@/components/feature/book/BookDescription";
import BookHeader from "@/components/feature/book/BookHeader";
import BookDetailsSkeleton from "@/components/skeleton/BookDetailsSkeleton";
import ErrorScreen from "@/components/common/ErrorScreen";
import NotFoundScreen from "@/components/common/NotFoundScreen";

export default function BookDetails() {
  const { bookId } = useGlobalSearchParams<{ bookId: string }>();
  const [modalVisible, setModalVisible] = useState(false);

  const options = ["Option 1", "Option 2", "Option 3"];

  const {
    data: book,
    refetch,
    isRefetching,
    isPending,
    isError,
  } = useBookDetails(bookId);

  const handleOptionActions = (option: string) => {
    console.log(option);
  };

  return (
    <Screen>
      <HeaderTitle
        text="Book Information"
        threeDotsVisible={!isPending && !isError && !!book}
        onPress={() => setModalVisible(true)}
      />

      {isPending ? (
        <BookDetailsSkeleton />
      ) : isError ? (
        <ErrorScreen
          title="Unable to load book"
          description="Please try again."
          retryText="Retry"
          onRetry={refetch}
        />
      ) : !book ? (
        <NotFoundScreen
          title="Book not found"
          description="We couldn't find this book."
        />
      ) : (
        <>
          {/* ScrollView */}
          {/* Body */}
          <ScrollView
            className="flex-1 px-6 py-4"
            refreshControl={
              <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
            }
          >
            {/* Top section */}
            <BookHeader
              title={book.title}
              author={book.author}
              coverImage={book.coverImage}
              // availability={book.a}
            />
            {/* Mid Details */}
            <BookMetadata
              items={[
                {
                  label: "Genre",
                  value: book?.genres.join(", "),
                },
                {
                  label: "Pages",
                  value: book?.pageCount,
                },
                {
                  label: "ISBN",
                  value: book?.isbn,
                },
                {
                  label: "Publisher",
                  value: book?.publisher,
                },
                {
                  label: "Publish Date",
                  value: book?.publishDate,
                },
              ]}
            />

            {/* Description */}
            <BookDescription description={book?.description} />

            {/* Borrowed by */}
            {/* {book?.availability === "borrowed" && username && (
          <View className="mt-5">
            <AppText className="text-base font-semibold text-primary">
              Borrowed By
            </AppText>

            <AppText>
              {username === "None" ? "None" : `@${username}`}
            </AppText>
          </View>
        )} */}
          </ScrollView>
        </>
      )}
    </Screen>
  );
}
