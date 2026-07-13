import { Image, TouchableOpacity, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { calculateDaysSinceAdded } from "@/lib/misc";
import { BookCardItem } from "@/types/book";

import BookPlaceholder from "@assets/images/placeholder-book.png";
import BookCover from "@/components/ui/BookCover";
import { ReactNode } from "react";
import { User } from "@/types/user";
import { formatDate } from "@/lib/date";
import { LOG_SCOPE, logger } from "@/lib/logger";

type BookCardProps = {
  item: BookCardItem;
  onPress?: (item: BookCardItem) => void;
  returnBook?: (id: string) => void;
  daysSinceAdded?: (date: string) => string;
  actionButton?: "bottom" | "right" | "none";
  action?: ReactNode;
};

export default function BookCard({
  item,
  onPress,
  actionButton = "none",
  action,
}: BookCardProps) {
 logger.debug(LOG_SCOPE.query, "Book Deatail: ", {
  item
 })
  return (
    <View className="flex-1">
      <View className="flex-row items-center px-4 py-3">
        <BookCover
          source={
            item?.coverImage ? { uri: item?.coverImage } : BookPlaceholder
          }
          size="xs"
          className="mr-4"
        />

        <View className="flex-1 h-full">
          <TouchableOpacity className="gap-1" onPress={() => onPress?.(item)}>
            <View>
              <AppText
                weight="semibold"
                size="lg"
                numberOfLines={1}
                className="mt-1"
                ellipsizeMode="tail"
              >
                {item?.title ?? "N/A"}
              </AppText>

              <AppText
                size="base"
                className="mt-0.5"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item?.author.join(",") ?? "N/A"}
              </AppText>
            </View>

            {item?.type === "userBook" ? (
              <AppText size="sm" className="mt-2" numberOfLines={1}>
                Added {calculateDaysSinceAdded(item.addedAt)}
              </AppText>
            ) : item?.type === "lent" || item?.type === "borrowed" ? (
              <AppText size="sm" className="mt-1" numberOfLines={1}>
                {item?.type === "lent" ? "Lent" : "Borrowed"}{" "}
                {calculateDaysSinceAdded(item?.borrowAt)} {" | "} 
                {" Due"} {formatDate(item.dueAt, "absolute")}
              </AppText>
            ) : (item?.requester?.id) ? (
              <AppText size="sm" className="mb-2">
                Requested by{" "}
                <AppText weight="semibold">{item?.requester?.fullName}</AppText>
              </AppText>
            ) : null}
            
          </TouchableOpacity>
        </View>
        {actionButton === "right" && <>{action}</>}
      </View>
      {actionButton === "bottom" && <>{action}</>}
    </View>
  );
}
