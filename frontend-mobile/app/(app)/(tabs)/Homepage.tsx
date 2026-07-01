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

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

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
      className="w-[33%] h-48 p-3 items-center"
      onPress={() => router.push(`/books/UserBookDetails/${item.userBookId}`)}
    >
      <Image
        source={item.coverImage ? { uri: item.coverImage } : BookPlaceholder}
        className="w-full h-35 mb-2 rounded bg-gray-200"
      />

      <AppText
        size="sm"
        weight="semibold"
        center
        // className="text-sm font-semibold text-text-light text-center"
        numberOfLines={2}
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
          data={books}
          numColumns={3}
          keyExtractor={(item) => item.id}
          renderItem={renderBookItem}
          refreshing={isRefetching}
          onRefresh={refetch}
          contentContainerClassName="p-4"
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 4,
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
