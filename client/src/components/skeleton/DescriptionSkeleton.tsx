import { View, Text } from "react-native";
import Skeleton from "../ui/Skeleton";

type Props = {};

export default function DescriptionSkeleton({}: Props) {
  return (
    <View className="mt-4">
      <Skeleton width={130} height={20} />

      <Skeleton className="mt-4" width="100%" height={14} />

      <Skeleton className="mt-2" width="95%" height={14} />

      <Skeleton className="mt-2" width="85%" height={14} />

      <Skeleton className="mt-2" width="70%" height={14} />
    </View>
  );
}
