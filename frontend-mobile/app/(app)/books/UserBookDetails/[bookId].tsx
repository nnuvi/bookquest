import { useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, RefreshControl, ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";

import AppText from "@/components/common/AppText";
import DropdownModal from "@/components/common/DropdownModal";
import { HeaderTitle } from "@/components/common/HeaderTitle";
// import { UserBook } from "@/types/book";
import Loading from "@/components/common/Loading";
import { useBookDeatails } from "@/hooks/books";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookDetails() {
  const { bookId } = useGlobalSearchParams<{ bookId: string }>();
  const [modalVisible, setModalVisible] = useState(false);

  const options = ["Option 1", "Option 2", "Option 3"];

  const {
    data: userBook,
    refetch,
    isRefetching,
    isLoading,
  } = useBookDeatails(bookId);

  if (isLoading) return <Loading />;

  const handleOptionActions = (option: string) => {
    console.log(option);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header */}
      <HeaderTitle
        text="Book Information"
        threeDotsVisible
        onPress={() => setModalVisible(true)}
      />

      <DropdownModal
        visible={modalVisible}
        options={options}
        onSelect={handleOptionActions}
        onClose={() => setModalVisible(false)}
      />

      {/* Body */}
      <ScrollView
        className="flex-1 px-4 py-4"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        {/* Top section */}
        <View className="flex-row space-x-4">
          {/* Image */}
          <View className="w-1/3 mr-3">
            <Image
              source={{ uri: userBook?.book?.coverImage }}
              className="w-full h-44 rounded-lg bg-gray-200"
              resizeMode="cover"
            />
          </View>

          {/* Top Details */}
          <View className="w-2/3 justify-between py-4">
            <View>
              <AppText className="text-2xl font-bold">
                {userBook?.book?.title || "N/A"}
              </AppText>

              <AppText className="text-lg mt-1 text-midgray-dark">
                by {userBook?.book?.author?.join(", ") || "N/A"}
              </AppText>
            </View>

            <View className="flex-row items-center">
              <View
                className={`w-3 h-3 rounded-full mr-2 ${
                  userBook?.availability === "available"
                    ? "bg-green-500"
                    : userBook?.availability === "borrowed"
                      ? "bg-yellow-500"
                      : userBook?.availability === "lent"
                        ? "bg-blue-500"
                        : "bg-red-500"
                }`}
              />

              <AppText className="capitalize font-medium">
                {userBook?.availability}
              </AppText>
            </View>
          </View>
        </View>

        {/* Mid Details */}
        <View className="bg-card-bg rounded-xl p-4 mt-4 shadow">
          {[
            ["Genre", userBook?.book?.genres.join(", ")],
            ["Pages", userBook?.book?.pageCount],
            ["Condition", userBook?.condition],
            ["ISBN", userBook?.book?.isbn],
            ["Publisher", userBook?.book?.publisher],
            [
              "Added",
              userBook?.addedAt
                ? new Date(userBook?.addedAt).toLocaleDateString()
                : "",
            ],
          ].map(([label, value]) => (
            <View key={String(label)} className="flex-row py-2">
              <AppText className="w-24 font-medium">{label}</AppText>

              <AppText
                numberOfLines={2}
                ellipsizeMode="tail"
                className="flex-1"
              >
                {value || "N/A"}
              </AppText>
            </View>
          ))}
        </View>

        {/* Description */}
        <View className="mt-5">
          <AppText className="text-xl font-semibold mb-1">Description</AppText>

          <AppText className="leading-5">
            {userBook?.book?.description || "N/A"}
          </AppText>
        </View>

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

      <Toast />
    </SafeAreaView>
  );
}
