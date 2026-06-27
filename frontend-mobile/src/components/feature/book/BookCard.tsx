import { Image, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

import AppText from "@/components/common/AppText";
import { Book, BookCardItem, UserBook } from "@/types/book";
import { useAuth } from "@/hooks/auth";
import { useAuthStore } from "@/store/auth.store";
import { calculateDaysSinceAdded } from "@/lib/misc";

type BookCardProps = {
  item: BookCardItem;
  returnBook?: (id: string) => void;
  daysSinceAdded?: (date: string) => string;
};

export default function BookCard({ item }: BookCardProps) {
  // console.log("items: ", item);
  // const user = useAuthStore();
  return (
    <View className="flex-row items-center p-4 py-3 border-0.1  border-primary">
      <View className="w-12.5 h-18.75 rounded-md mr-3 border-primary bg-gray-200">
        <Image></Image>
      </View>

      <TouchableOpacity
        className="flex-1"
        onPress={() =>
          router.push({
            pathname: "/books/UserBookDetails/[bookId]",
            params: { bookId: item.userBook?._id },
          })
        }
      >
        <AppText className="text-lg font-semibold" ellipsizeMode="tail">
          {item.userBook.book?.title ?? "N/A"}
        </AppText>

        <AppText className="text-md" ellipsizeMode="tail">
          {item.userBook.book?.author.join(", ") ?? "N/A"}
        </AppText>

        {item.type === "userBook" ? (
          <AppText className="text-xs mt-1">
            Added {calculateDaysSinceAdded(item.addedAt)}
          </AppText>
        ) : (
          <AppText className="text-xs mt-1">
            {item.type === "lent" ? "Lent" : "Borrowed"}{" "}
            {calculateDaysSinceAdded(item.borrowDate)}
          </AppText>
        )}
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
