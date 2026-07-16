import AppText from "@/components/ui/AppText";
import { View, Image } from "react-native";
import BookPlaceholder from "@assets/images/placeholder-book.png";
import BookCover from "@/components/ui/BookCover";

type BookHeaderProps = {
  title?: string;
  author?: string[];
  coverImage?: string;
  availability?: string;
};

export default function BookHeader({
  title,
  author,
  coverImage,
  availability,
}: BookHeaderProps) {
  return (
    <View className="flex-row">
      <BookCover image={coverImage} size="lg" className="mr-4" />

      <View className="flex-1 justify-between py-2">
        <View>
          <AppText
            size="2xl"
            weight="bold"
            className="text-2xl font-bold"
            numberOfLines={2}
          >
            {title ?? "N/A"}
          </AppText>

          <AppText size="lg" color="midGray" className="mt-2" numberOfLines={2}>
            by {author?.join(", ") ?? "N/A"}
          </AppText>
        </View>
        {availability && (
          <View className="flex-row items-center">
            <View
              className={`w-3 h-3 rounded-full mr-2 ${
                availability === "available"
                  ? "bg-green-500"
                  : availability === "borrowed"
                    ? "bg-yellow-500"
                    : availability === "lent"
                      ? "bg-blue-500"
                      : "bg-red-500"
              }`}
            />

            <AppText className="capitalize font-medium">{availability}</AppText>
          </View>
        )}
      </View>
    </View>
  );
}
