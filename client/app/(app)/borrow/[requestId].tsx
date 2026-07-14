import { router, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, View } from "react-native";

import Screen from "@/components/common/Screen";
import { HeaderTitle } from "@/components/common/HeaderTitle";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import DetailRow from "@/components/ui/DetailRow";
// import UserListItem from "@/components/ui/UserListItem";
import Button from "@/components/ui/Button";
import AppText from "@/components/ui/AppText";

import BorrowRequestAction from "@/components/feature/borrow/BorrowActionButton";

import BookPlaceholder from "@assets/images/placeholder-book.png";

import { useBorrowRequestDetails } from "@/hooks/borrow";
import UserCard from "@/components/feature/user/UserCard";
import { LOG_SCOPE, logger } from "@/lib/logger";
import BookCard from "@/components/feature/book/BookCard";
import { mapUserBook } from "@/services/book.mapper";
import BookMetadata from "@/components/feature/book/BookMetadata";
import MetadataList from "@/components/ui/MetadataList";
import { formatDate } from "@/lib/date";
import ErrorScreen from "@/components/common/ErrorScreen";
import NotFoundScreen from "@/components/common/NotFoundScreen";
import QueryState from "@/components/common/QueryState";
import BorrowRequestDetailsSkeleton from "@/components/skeleton/BorrowRequestDetailsSkeleton";

export default function BorrowRequestDetailsScreen() {
  const { requestId } = useLocalSearchParams<{
    requestId: string;
  }>();

  const query = useBorrowRequestDetails(requestId);

  return (
    <Screen>
      <HeaderTitle text="Borrow Request" />

      <QueryState
        query={query}
        loading={<BorrowRequestDetailsSkeleton />}
        notFound={
          <NotFoundScreen
            title="Request not found"
            description="We couldn't find this request."
          />
        }
      >
        {(request) => (
          <>
            <ScrollView
              contentContainerStyle={{
                padding: 10,
                gap: 8,
                paddingBottom: 20,
              }}
            >
              {/* Book */}
              <Card>
                <Section title="Book">
                  <BookCard item={mapUserBook(request.userBook)} />

                  <Button
                    className="mt-2"
                    title="View Book"
                    variant="neutral"
                    onPress={() =>
                      router.push(
                        `/books/UserBookDetails/${request.userBook._id}`
                      )
                    }
                  />
                </Section>
              </Card>

              {/* User */}
              <Card>
                <Section title="Requested By">
                  <UserCard user={request.requester} />
                </Section>
              </Card>

              {/* Details */}
              <Card>
                <Section title="Request Details">
                  <MetadataList
                    items={[
                      {
                        label: "Status",
                        value: request.status,
                      },
                      {
                        label: "Duration",
                        value: `${request.borrowDurationDays} days`,
                      },
                      {
                        label: "Requested",
                        value: formatDate(request.createdAt),
                      },
                      {
                        label: "Expires",
                        value: formatDate(request.expiresAt),
                      },
                    ]}
                  />
                </Section>
              </Card>

              {/* Message */}
              <Card>
                <Section title="Message">
                  <AppText className="leading-6 text-text-muted">
                    {request.message || "No message was included."}
                  </AppText>
                </Section>
              </Card>
            </ScrollView>

            {request.status === "pending" && (
              <View className="pb-6 px-3">
                <BorrowRequestAction
                  requestId={request._id}
                  fullWidth
                  mode="incoming"
                />
              </View>
            )}
          </>
        )}
      </QueryState>
    </Screen>
  );
}

