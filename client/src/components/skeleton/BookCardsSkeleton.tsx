import Skeleton from "@/components/skeleton/Skeleton";
import React from "react";
import { View } from "react-native";

interface BookCardSkeletonProps {
  count?: number;
}

export default function BookCardSkeleton({ count = 6 }: BookCardSkeletonProps) {
  return (
    <View className="p-4">
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} className="flex-row rounded-xl bg-card p-4">
          <Skeleton width={65} height={90} radius={8} className="mr-4" />

          <View className="flex-1 justify-center">
            <Skeleton width="90%" height={20} />

            <Skeleton className="mt-3" width="60%" height={15} />

            <Skeleton className="mt-5" width="90%" height={12} />
          </View>
        </View>
      ))}
    </View>
  );
}
