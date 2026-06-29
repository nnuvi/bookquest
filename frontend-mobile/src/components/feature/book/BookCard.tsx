import { Image, TouchableOpacity, View } from "react-native";

import AppText from "@/components/common/AppText";
import { calculateDaysSinceAdded } from "@/lib/misc";
import { BookCardItem } from "@/types/book";

type BookCardProps = {
  item: BookCardItem;
  onPress?: (item: BookCardItem) => void;
  returnBook?: (id: string) => void;
  daysSinceAdded?: (date: string) => string;
};

export default function BookCard({ item, onPress }: BookCardProps) {
  // console.log("items: ", item);

  return (
    <View className="flex-row items-center p-4 py-3 border-0.1  border-primary">
      <View className="w-12.5 h-18.75 rounded-md mr-3 border-primary bg-gray-200">
        <Image source={{ uri: item?.coverImage }} />
      </View>

      <TouchableOpacity className="flex-1" onPress={() => onPress?.(item)}>
        <AppText className="text-lg font-semibold" ellipsizeMode="tail">
          {item?.title ?? "N/A"}
        </AppText>

        <AppText className="text-md" ellipsizeMode="tail">
          {item?.author.join(", ") ?? "N/A"}
        </AppText>

        {item?.type === "userBook" ? (
          <AppText className="text-xs mt-1">
            Added {calculateDaysSinceAdded(item.addedAt)}
          </AppText>
        ) : item?.type === "lent" || item?.type === "borrowed" ? (
          <AppText className="text-xs mt-1">
            {item?.type === "lent" ? "Lent" : "Borrowed"}{" "}
            {calculateDaysSinceAdded(item?.borrowDate)}
          </AppText>
        ) : null}
      </TouchableOpacity>

      {/* {item.bookType !== "myBook" &&
        (item.bookType === "lent" ||
        item.bookType === "lentBook" ? (
          <TouchableOpacity className="bg-primary px-3 py-2 rounded-lg">
            <AppText className="text-background font-bold">
              Ask Back
            </AppText>
          </TouchableOpacity>
        ) : item.bookType === "borrow" ||
          item.bookType === "borrowedBook" ? (
          <TouchableOpacity
            className="bg-primary px-3 py-2 rounded-lg"
            onPress={() => returnBook(item._id)}
          >
            <AppText className="text-background font-bold">
              Return
            </AppText>
          </TouchableOpacity>
        ) : null)} */}
    </View>
  );
}
