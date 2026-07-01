import { Image, TouchableOpacity, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { calculateDaysSinceAdded } from "@/lib/misc";
import { BookCardItem } from "@/types/book";

import BookPlaceholder from "@assets/images/placeholder-book.png";

type BookCardProps = {
  item: BookCardItem;
  onPress?: (item: BookCardItem) => void;
  returnBook?: (id: string) => void;
  daysSinceAdded?: (date: string) => string;
};

export default function BookCard({ item, onPress }: BookCardProps) {
  return (
    <View className="flex-1">
      <View className="flex-row items-center px-6 py-3">
        <View className="w-13.5 h-19.5 rounded-md mr-3">
          <Image
            source={
              item?.coverImage ? { uri: item?.coverImage } : BookPlaceholder
            }
            className="w-full h-full rounded-md"
            resizeMode="cover"
          />
        </View>

        <View className="flex-1 h-full">
          <TouchableOpacity className="gap-1" onPress={() => onPress?.(item)}>
            <View>
              <AppText
                weight="semibold"
                size="lg"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item?.title ?? "N/A"}
              </AppText>

              <AppText size="md" numberOfLines={1} ellipsizeMode="tail">
                {item?.author.join(",") ?? "N/A"}
              </AppText>
            </View>

            {item?.type === "userBook" ? (
              <AppText size="sm" className="mt-1" numberOfLines={1}>
                Added {calculateDaysSinceAdded(item.addedAt)}
              </AppText>
            ) : item?.type === "lent" || item?.type === "borrowed" ? (
              <AppText size="sm" className="mt-1" numberOfLines={1}>
                {item?.type === "lent" ? "Lent" : "Borrowed"}{" "}
                {calculateDaysSinceAdded(item?.borrowDate)}
              </AppText>
            ) : null}
          </TouchableOpacity>
        </View>

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
    </View>
  );
}
