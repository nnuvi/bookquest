import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";

import { HeaderTitle } from "@/components/common/HeaderTitle";
import Screen from "@/components/common/Screen";
import SearchBar from "@/components/common/SearchBar";

import AppText from "@/components/ui/AppText";

import BookCardSkeleton from "@/components/skeleton/BookCardsSkeleton";
import UserCardListSkeleton from "@/components/skeleton/UserCardSkeleton";

import EmptyState from "@/components/common/EmptyState";
import ErrorScreen from "@/components/common/ErrorScreen";

import BookCard from "@/components/feature/book/BookCard";
import UserCard from "@/components/feature/user/UserCard";
import { useSearchBooks } from "@/hooks/books";
import { useSearchUsers } from "@/hooks/user";
import { LOG_SCOPE, logger } from "@/lib/logger";
import { useQueryClient } from "@tanstack/react-query";
import FriendAction from "@/components/feature/friend/FriendAction";

export default function Search() {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");

  const hasSearch = search.trim().length >= 2;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length >= 2 || query.length === 0) {
        setSearch(query);
        logger.info(LOG_SCOPE.query, "Search query:", query);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  const queryClient = useQueryClient();

  useFocusEffect(
    useCallback(() => {
      return () => {
        setQuery("");
        setSearch("");

        queryClient.removeQueries({
          queryKey: ["searchBooks"],
        });

        queryClient.removeQueries({
          queryKey: ["searchUsers"],
        });
      };
    }, [queryClient]),
  );

  const {
    data: books = [],
    refetch: booksRefetch,
    isPending: booksPending,
    isRefetching: booksRefreshing,
    isError: booksError,
  } = useSearchBooks(search);

  const {
    data: users = [],
    refetch: usersRefetch,
    isPending: usersPending,
    isRefetching: usersRefreshing,
    isError: usersError,
  } = useSearchUsers(search);

  const onRefresh = async () => {
    await Promise.all([booksRefetch(), usersRefetch()]);
  };

  const refreshing = booksRefreshing || usersRefreshing;

  return (
    <Screen>
      <HeaderTitle text="Search" />

      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSearchPress={() => setSearch(query.trim())}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        refreshControl={
          hasSearch ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : undefined
        }
      >
        {/* Books */}
        <AppText size="2xl" weight="bold" className="px-6">
          Books
        </AppText>

        {!hasSearch ? (
          <EmptyState
            title="Search Books"
            description="Search for books by title, author, publisher, or ISBN."
          />
        ) : booksPending ? (
          <BookCardSkeleton count={2} />
        ) : booksError ? (
          <ErrorScreen
            title="Couldn't load books"
            description="Please try again."
            retryText="Retry"
            onRetry={booksRefetch}
          />
        ) : books.length === 0 ? (
          <EmptyState
            title="No Books Found"
            description={
              search
                ? `No books matched "${search}".`
                : "Search for books by title, author or ISBN."
            }
          />
        ) : (
          books.map((book) => (
            <BookCard
              key={book.bookId}
              item={book}
              onPress={(item) =>
                router.push(`/books/BookDetails/${item.bookId}`)
              }
            />
          ))
        )}

        {/* Users */}
        <AppText size="2xl" weight="bold" className="px-6 mt-4">
          Users
        </AppText>

        {!hasSearch ? (
          <EmptyState
            title="Search Users"
            description="Search for users by name or username."
          />
        ) : usersPending ? (
          <UserCardListSkeleton count={2} />
        ) : usersError ? (
          <ErrorScreen
            title="Couldn't load users"
            description="Please try again."
            retryText="Retry"
            onRetry={usersRefetch}
          />
        ) : users.length === 0 ? (
          <EmptyState
            title="No Users Found"
            description={
              search
                ? `No users matched "${search}".`
                : "Search for users by username or name."
            }
          />
        ) : (
          users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              actionButton="bottom"
              action={<FriendAction userId={user._id} />}
            />
          ))
        )}
      </ScrollView>
    </Screen>
  );
}
