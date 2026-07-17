import { View } from "react-native";

import Skeleton from "../ui/Skeleton";

type ButtonSkeletonProps = {
  variant?: "single" | "double";
};

export default function ButtonSkeleton({
  variant = "single",
}: ButtonSkeletonProps) {
  if (variant === "double") {
    return (
      <View className="mt-4 flex-row gap-3">
        <View className="flex-1">
          <Skeleton width="100%" height={36} radius={100} />
        </View>

        <View className="flex-1">
          <Skeleton width="100%" height={36} radius={100} />
        </View>
      </View>
    );
  }

  return (
    <View className="mt-4">
      <Skeleton width="100%" height={36} radius={100} />
    </View>
  );
}
