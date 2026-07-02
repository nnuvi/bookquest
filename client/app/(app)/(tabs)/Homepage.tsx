import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";

import DropdownModal from "@/components/common/DropdownModal";
import LogoText from "@/components/common/LogoText";
import Screen from "@/components/common/Screen";

import EmptyState from "@/components/feedback/EmptyState";
import ErrorScreen from "@/components/feedback/ErrorScreen";

import BookGridSkeleton from "@/components/skeleton/BookGridSkeleton";

import { useMyBooks } from "@/hooks/books";
import { api } from "@/lib/api";
import { BookCardItem } from "@/types/book";

import BookPlaceholder from "@assets/images/placeholder-book.png";
import AppText from "@/components/ui/AppText";
import BookCover from "@/components/ui/BookCover";
import { useResponsive } from "@/hooks/useResponsive";
import { LOG_SCOPE, Logger } from "@/lib/logger";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const { bookCardWidth, isDesktop, isTablet, numColumns } = useResponsive();

  Logger.debug(LOG_SCOPE.image, "bookCardWidth", bookCardWidth);
  Logger.debug(LOG_SCOPE.image, "isDesktop", isDesktop);
  Logger.debug(LOG_SCOPE.image, "isTablet", isTablet);
  Logger.debug(LOG_SCOPE.image, "numColumns", numColumns);

  const {
    data: books = [],
    refetch,
    isRefetching,
    isPending,
    isError,
  } = useMyBooks();

  const options = ["Option 1", "Option 2", "Option 3", "Log out"];

  const handleOptionActions = async (option: string) => {
    setModalVisible(false);

    switch (option) {
      case "Log out":
        await api.post("/api/auth/logout");
        router.replace("/");
        break;

      default:
        break;
    }
  };

  const renderBookItem = ({ item }: { item: BookCardItem }) => (
    <TouchableOpacity
      style={{ width: bookCardWidth }}
      className={`items-center px-2`}
      onPress={() => router.push(`/books/UserBookDetails/${item.userBookId}`)}
    >
      <BookCover
        source={item.coverImage ? { uri: item.coverImage } : BookPlaceholder}
      />

      <AppText
        size="sm"
        weight="semibold"
        center
        numberOfLines={2}
        className="mt-2"
      >
        {item.title}
      </AppText>
    </TouchableOpacity>
  );

  return (
    <Screen>
      {/* Header */}
      <View className="bg-primary px-5 pt-3 pb-2">
        <View className="flex-row items-center justify-between">
          <LogoText />

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <DropdownModal
          visible={modalVisible}
          options={options}
          top={60}
          onSelect={handleOptionActions}
          onClose={() => setModalVisible(false)}
        />
      </View>

      {isPending ? (
        <BookGridSkeleton />
      ) : isError ? (
        <ErrorScreen
          title="Unable to load books"
          description="Please try again."
          retryText="Retry"
          onRetry={refetch}
        />
      ) : (
        <FlatList
          key={numColumns}
          data={books}
          style={{
            flex: 1,
            width: "100%",
          }}
          numColumns={numColumns}
          keyExtractor={(item) => item.id}
          renderItem={renderBookItem}
          refreshing={isRefetching}
          onRefresh={refetch}
          contentContainerClassName="p-4 pb-70"
          columnWrapperStyle={{
            justifyContent: "space-between", // Change to flex-start to prevent strange alignment gaps
            gap: 8, // Adds even grid spacing between cards
            marginBottom: 10,
          }}
          ListEmptyComponent={
            <EmptyState
              title="No Books Yet"
              description="Start building your personal library by adding your first book."
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </Screen>
  );
}
