import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";

import DropdownModal from "@/components/common/DropdownModal";
import LogoText from "@/components/common/LogoText";
import Screen from "@/components/common/Screen";

import ErrorScreen from "@/components/common/ErrorScreen";

import BookGridSkeleton from "@/components/skeleton/BookGridSkeleton";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

import { useMyBooks } from "@/hooks/books";
import { api } from "@/lib/api";

import BookGrid from "@/components/feature/book/BookGrid";
import { Colors } from "@/constants/Colors";
import { useLogout } from "@/hooks/auth";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const {
    data: books = [],
    refetch,
    isRefetching,
    isPending,
    isError,
  } = useMyBooks();

  const logoutMutation = useLogout();

  const options = ["Log out"];
  // const options = ["Option 1", "Option 2", "Option 3", "Log out"];

  // const handleOptionActions = async (option: string) => {
  //   setModalVisible(false);

  //   switch (option) {
  //     case "Log out":
  //       await api.post("/api/auth/logout");
  //       router.replace("/");
  //       break;

  //     default:
  //       break;
  //   }
  // };

  return (
    <Screen>
      {/* Header */}
      <View className="bg-primary px-5 pt-3 pb-2">
        <View className="flex-row items-center justify-between">
          <LogoText />
          <View className="flex-row gap-3">
            <Pressable onPress={() => router.push(`add/ScanISBN`)}>
              <SimpleLineIcons
                name="camera"
                size={24}
                color={Colors.background}
              />
            </Pressable>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>

        <DropdownModal
          visible={modalVisible}
          options={options}
          top={60}
          onSelect={() => logoutMutation.mutate()}
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
        // <View className="flex-1 items-start">
        <View className="flex-1 items-center">
          <BookGrid
            books={books}
            refreshing={isRefetching}
            onRefresh={refetch}
          />
        </View>
        // </View>
      )}
    </Screen>
  );
}
