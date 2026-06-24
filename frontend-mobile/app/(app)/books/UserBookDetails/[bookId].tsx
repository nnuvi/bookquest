import { api } from "@/utils/api";
import { useGlobalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import Toast from "react-native-toast-message";

import { HeaderTitle } from "@/components/common/HeaderTitle";
import StatusBar from "@/components/common/StatusBar";
import DropdownModal from "@/components/common/DropdownModal";
import  AppText from "@/components/common/AppText";
import { UserBook } from "@/types/book";

export default function BookDetails() {
  const { bookId } = useGlobalSearchParams<{ bookId?: string }>();

  const [data, setData] = useState<UserBook | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const options = ["Option 1", "Option 2", "Option 3"];

  // fetch book
  const getBookDetails = async () => {
    console.log("bookid:", bookId);
    try {
      const res = await api.get(`/books/details/${bookId}`);
      console.log("res", res.status);
      console.log("res.data: ", res.data);
      setData(res.data);
      setUsername(res.data.owner.username);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (bookId) getBookDetails();
  }, [bookId]);

  const handleOptionActions = (option: string) => {
    console.log(option);
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar />

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
      <ScrollView className="flex-1 px-4 py-4">
        {/* Top section */}
        <View className="flex-row space-x-4">
          {/* Image */}
          <View className="w-1/3 mr-3">
            <Image
              source={{ uri: data?.book?.coverImage }}
              className="w-full h-44 rounded-lg bg-gray-200"
              resizeMode="cover"
            />
          </View>

          {/* Top Details */}
          <View className="w-2/3 justify-between py-4">
            <View>
              <AppText className="text-2xl font-bold">
                {data?.book?.title || "N/A"}
              </AppText>

              <AppText className="text-lg mt-1 text-midgray-dark">
                by {data?.book?.author?.join(", ") || "N/A"}
              </AppText>
            </View>

            <View className="flex-row items-center">
              <View
                className={`w-3 h-3 rounded-full mr-2 ${
                  data?.availability === "available"
                    ? "bg-green-500"
                    : data?.availability === "borrowed"
                    ? "bg-yellow-500"
                    : data?.availability === "lent"
                    ? "bg-blue-500"
                    : "bg-red-500"
                }`}
              />

              <AppText className="capitalize font-medium">
                {data?.availability}
              </AppText>
            </View>
          </View>
        </View>

        {/* Mid Details */}
        <View className="bg-card-bg rounded-xl p-4 mt-4 shadow">
          {[
            ["Genre", data?.book?.genres.join(", ")],
            ["Pages", data?.book?.pageCount],
            ["Condition", data?.condition],
            ["ISBN", data?.book?.isbn],
            ["Publisher", data?.book?.publisher],
            [
              "Added",
              data?.addedAt
                ? new Date(data.addedAt).toLocaleDateString()
                : "",
            ],
          ].map(([label, value]) => (
            <View key={String(label)} className="flex-row py-2">
              <AppText className="w-24 font-medium">
                {label}
              </AppText>

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
          <AppText className="text-xl font-semibold mb-1">
            Description
          </AppText>

          <AppText className="leading-5">
            {data?.book?.description || "N/A"}
          </AppText>
        </View>

        {/* Borrowed by */}
        {/* {data?.availability === "borrowed" && username && (
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
    </View>
  );
}