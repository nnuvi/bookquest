import { Pressable } from "react-native";

import AppText from "@/components/ui/AppText";
import BookCover from "@/components/ui/BookCover";

import { BookCardItem } from "@/types/book";
import { useResponsive } from "@/hooks/useResponsive";

type BookGridItemProps = {
  item: BookCardItem;
  onPress?: () => void;
};

export default function BookGridItem({ item, onPress }: BookGridItemProps) {
  const { bookCardWidth } = useResponsive();

  return (
    <Pressable
      onPress={onPress}
      style={{
        width: bookCardWidth,
        marginBottom: 10,
        margin: 6
      }}
      className="items-center"
    >
      <BookCover image={item.coverImage} />

      <AppText
        size="sm"
        weight="semibold"
        center
        numberOfLines={2}
        className="mt-2"
      >
        {item.title}
      </AppText>

      {/* {!!item.author && (
        <AppText
          size="xs"
          color="neutral"
          center
          numberOfLines={1}
          className="mt-1"
        >
          {item.author}
        </AppText>
      )} */}
    </Pressable>
  );
}
