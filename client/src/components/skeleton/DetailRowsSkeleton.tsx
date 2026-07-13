import { View, Text } from "react-native";
import Skeleton from "../ui/Skeleton";

type Props = {};

export default function DetailRowsSkeleton({}: Props) {
  return (
    <View className="mt-6">
      {[1, 2, 3, 4].map((item) => (
        <View key={item} className="mb-4 flex-row justify-between">
          <Skeleton width={"28%"} height={15} />

          <Skeleton width={"70%"} height={15} />
        </View>
      ))}
    </View>
  );
}
