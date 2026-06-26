import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { api } from "@/lib/api";
import Toast from "react-native-toast-message";
import LogoText from "@/components/common/LogoText";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import DropdownModal from "@/components/common/DropdownModal";
import StatusBar from "@/components/common/StatusBar";

type Book = {
  _id: string;
  book: {
    title: string;
    image: string;
  };
};

type User = {
  _id: string | null;
  username: string | null;
};

const HomeScreen = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const getBookCollection = async () => {
    try {
      const res = await api.get("/book/me");
      console.log(res.status);
      const data: Book[] = res.data;
      // console.log(data);

      if (data) setBooks(data);
      else setBooks([]);
      // console.log("books:", books);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBookCollection();
  }, []);

  const handleOptionActions = (option: string) => {
    if (option === "Log out") {
      api.post("/auth/logout");
      router.replace("/");
    }
  };

  const renderBookItem = ({ item }: { item: Book }) => (
    <TouchableOpacity
      className="w-[33%] h-48 p-3 items-center "
      onPress={() =>
        router.push({
          pathname: "(app)/books/UserBookDetails/[bookId]",
          params: { bookId: item._id },
        })
      }
    >
      <Image
        source={{ uri: item.book.image }}
        className="w-full h-35 mb-2 bg-gray-200 rounded"
      />
      <Text
        className="text-sm font-semibold text-text-light text-center"
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {item.book.title}
      </Text>
    </TouchableOpacity>
  );

  const options = ["Option 1", "Option 2", "Option 3", "Log out"];

  return (
    <SafeAreaView className="flex-1">
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
        keyExtractor={(item) => item._id}
        renderItem={renderBookItem}
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
    </SafeAreaView>
  );
};

export default HomeScreen;
