import Skeleton from "@/components/ui/Skeleton";
import React from "react";
import { View } from "react-native";

interface BookGridSkeletonProps {
  count?: number;
}

export default function BookGridSkeleton({ count = 6 }: BookGridSkeletonProps) {
  return (
    <View className="flex-row flex-wrap justify-between p-4">
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} className="mb-5 p-3" style={{ width: "33%" }}>
          {/* Book Cover */}
          <Skeleton width="100%" height={140} radius={8} />

          {/* Title */}
          <Skeleton className="mt-3" width="100%" height={18} />

          {/* Author */}
          {/* <Skeleton
            className="mt-2"
            width="65%"
            height={14}
          /> */}

          {/* Rating */}
          {/* <Skeleton
            className="mt-4"
            width={70}
            height={14}
          /> */}
        </View>
      ))}
    </View>
  );
}
