import { useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, RefreshControl, ScrollView, View } from "react-native";
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
import MetadataList from "@/components/ui/MetadataList";
import { useBorrowStatus } from "@/hooks/borrow";
import { useBorrowRecord } from "@/hooks/record";
import { useAuth, useAuthUser } from "@/hooks/auth";
import { navigate } from "@/lib/app";
import { useAuthStore } from "@/store/auth.store";
import Avatar from "@/components/ui/Avatar";
import { formatDate } from "@/lib/date";
import { LOG_SCOPE, logger } from "@/lib/logger";
import Spacer from "@/components/ui/Spacer";

export default function BookDetails() {
  // const { bookId } = useGlobalSearchParams<{ bookId: string }>();
  const { bookId, userId, fullName } = useGlobalSearchParams<{
    bookId: string;
    userId?: string;
    fullName?: string;
  }>();

  const {
    data: userBook,
    refetch,
    isRefetching,
    isPending,
    isError,
  } = useUserBookDetails(bookId);

  const { data: record } = useBorrowRecord(
    userBook?.availability === "borrowed" ? bookId : undefined,
  );

  const { user } = useAuthStore();

  logger.debug(LOG_SCOPE.query, "Record Data: ", { record, user });

  return (
    <Screen>
      <HeaderTitle text="Book Information" />

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

          <MetadataList
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
              ...(record?.owner?._id === user?._id
                ? [
                    {
                      label: "Borrower",
                      value: (
                        <Pressable
                          onPress={() =>
                            navigate(
                              `/profile/ProfileView/${record?.borrower?._id}`,
                            )
                          }
                          className="flex-row gap-1 items-center"
                        >
                          <Avatar
                            size={"tiny"}
                            image={record?.borrower?.profileImage?.url}
                          />
                          <AppText weight="bold" color="primary">
                            {record?.borrower?.fullName}
                          </AppText>
                        </Pressable>
                      ),
                    },
                    {
                      label: "Due",
                      value: formatDate(record?.dueAt, "relative"),
                    },
                  ]
                : record?.borrower?._id === user?._id
                  ? [
                      {
                        label: "Owner",
                        value: (
                          <Pressable
                            onPress={() =>
                              navigate(
                                `/profile/ProfileView/${record?.owner?._id}`,
                              )
                            }
                            className="flex-row gap-1 items-center"
                          >
                            <Avatar
                              size={"tiny"}
                              image={record?.owner?.profileImage?.url}
                            />
                            <AppText weight="bold" color="primary">
                              {record?.owner?.fullName}
                            </AppText>
                          </Pressable>
                        ),
                      },
                      {
                        label: "Due",
                        value: formatDate(record?.dueAt, "relative"),
                      },
                    ]
                  : []),
            ]}
          />

          <BookDescription
            description={userBook.book.description}
            notes={userBook.notes}
          />
        </ScrollView>
      )}

      {/* <Toast /> */}
    </Screen>
  );
}
