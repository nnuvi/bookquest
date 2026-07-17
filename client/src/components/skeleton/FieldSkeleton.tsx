import { DimensionValue, View } from "react-native";

import Skeleton from "../ui/Skeleton";

type FieldSkeletonProps = {
  count?: number;
  multiline?: boolean;
  labelWidth?: DimensionValue;
  inputWidth?: DimensionValue;
};

export default function FieldSkeleton({
  count = 1,
  multiline = false,
  labelWidth = "25%",
  inputWidth = "100%",
}: FieldSkeletonProps) {
  return (
    <View className="mt-4">
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} className="mb-5">
          <Skeleton width={labelWidth} height={20} radius={16} />

          <View className="mt-2">
            {multiline ? (
              <Skeleton width={inputWidth} radius={16} height={80} />
            ) : (
              <Skeleton width={inputWidth} radius={999} height={42} />
            )}
          </View>
        </View>
      ))}
    </View>
  );
}
