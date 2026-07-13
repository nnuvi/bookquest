import { View, Text } from "react-native";
import BookCardSkeleton from "./BookCardsSkeleton";
import UserCardListSkeleton from "./UserCardSkeleton";
import Skeleton from "../ui/Skeleton";
import DetailRowsSkeleton from "./DetailRowsSkeleton";
import DescriptionSkeleton from "./DescriptionSkeleton";

type Props = {};

export default function BorrowRequestDetailsSkeleton({}: Props) {
  return (
    <View className="flex-1 bg-background p-5">
      <Skeleton width={130} height={20} />
      <BookCardSkeleton count={1} />

      <Skeleton width={130} height={20} />
      <UserCardListSkeleton count={1} />

      <DetailRowsSkeleton />
      <DescriptionSkeleton />
    </View>
  );
}
