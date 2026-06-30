import DropdownModal from "@/components/common/DropdownModal";
import Loading from "@/components/common/Loading";
import LogoText from "@/components/common/LogoText";
import Screen from "@/components/common/Screen";
import { useMyBooks } from "@/hooks/books";
import { api } from "@/lib/api";
import { BookCardItem } from "@/types/book";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import BookPlaceholder from "@assets/images/placeholder-book.png";

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const { data: books = [], refetch, isRefetching, isLoading } = useMyBooks();
  console.log(books);

  const handleOptionActions = (option: string) => {
    if (option === "Log out") {
      api.post("/api/auth/logout");
      router.replace("/");
    }
  };

  const renderBookItem = ({ item }: { item: BookCardItem }) => (
    <TouchableOpacity
      className="w-[33%] h-48 p-3 items-center "
      onPress={() =>
        router.push(`/books/UserBookDetails/${item.userBookId}`)
      }
    >
      <Image
        source={item.coverImage ? { uri: item?.coverImage } : BookPlaceholder}
        className="w-full h-35 mb-2 bg-gray-200 rounded"
      />
      <Text
        className="text-sm font-semibold text-text-light text-center"
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const options = ["Option 1", "Option 2", "Option 3", "Log out"];

  if (isLoading) return <Loading />;

  return (
    <Screen>
      {/* Header */}
      <View className="px-5 pt-3 pb-2 bg-primary">
        <View className="flex-row justify-between items-center">
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

      {/* Book List */}

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
          <Text className="text-center mt-5 text-gray-500">
            No books available.
          </Text>
        }
      />
    </Screen>
  );
};

export default HomeScreen;
