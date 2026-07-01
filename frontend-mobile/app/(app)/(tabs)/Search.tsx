import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";

import Screen from "@/components/common/Screen";
import { HeaderTitle } from "@/components/common/HeaderTitle";
import SearchBar from "@/components/common/SearchBar";

import AppText from "@/components/ui/AppText";

import BookList from "@/components/feature/book/BookList";
import UserList from "@/components/feature/user/UserList";

import BookCardSkeleton from "@/components/skeleton/BookCardsSkeleton";
import UserCardListSkeleton from "@/components/skeleton/UserCardSkeleton";

import EmptyState from "@/components/feedback/EmptyState";
import ErrorScreen from "@/components/feedback/ErrorScreen";

import { useBooks } from "@/hooks/books";
import { useUsers } from "@/hooks/user";

export default function Search() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length >= 2 || query.length === 0) {
        setSearch(query);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  const {
    data: books = [],
    refetch: booksRefetch,
    isPending: booksPending,
    isRefetching: booksRefreshing,
    isError: booksError,
  } = useBooks(search);

  const {
    data: users = [],
    refetch: usersRefetch,
    isPending: usersPending,
    isRefetching: usersRefreshing,
    isError: usersError,
  } = useUsers(search);

  return (
    <Screen>
      <HeaderTitle text="Search" />

      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSearchPress={() => setSearch(query)}
      />

      <ScrollView className="flex-1">
        {/* Books */}
        <AppText className="m-2 px-2 font-semibold">
          Books
        </AppText>

        {booksPending ? (
          <BookCardSkeleton count={4} />
        ) : booksError ? (
          <ErrorScreen
            title="Couldn't load books"
            description="Please try again."
            retryText="Retry"
            onRetry={booksRefetch}
          />
        ) : (
          <BookList
            data={books}
            onItemPress={(item) =>
              router.push(`/books/BookDetails/${item.bookId}`)
            }
            refreshing={booksRefreshing}
            onRefresh={booksRefetch}
            listEmptyComponent={
              <EmptyState
                title="No Books Found"
                description={
                  search
                    ? `No books matched "${search}".`
                    : "Search for books by title, author or ISBN."
                }
              />
            }
          />
        )}

        {/* Users */}
        <AppText className="m-2 mt-6 px-2 font-semibold">
          Users
        </AppText>

        {usersPending ? (
          <UserCardListSkeleton count={4} />
        ) : usersError ? (
          <ErrorScreen
            title="Couldn't load users"
            description="Please try again."
            retryText="Retry"
            onRetry={usersRefetch}
          />
        ) : (
          <UserList
            users={users}
            refreshing={usersRefreshing}
            onRefresh={usersRefetch}
            listEmptyComponent={
              <EmptyState
                title="No Users Found"
                description={
                  search
                    ? `No users matched "${search}".`
                    : "Search for users by username or name."
                }
              />
            }
          />
        )}
      </ScrollView>
    </Screen>
  );
}