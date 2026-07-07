import Skeleton from "@/components/ui/Skeleton";
import React from "react";
import { View } from "react-native";

interface NotificationSkeletonProps {
  count?: number;
}

export default function NotificationSkeleton({
  count = 8,
}: NotificationSkeletonProps) {
  return (
    <View className="p-4">
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          className="mb-4 flex-row items-center rounded-xl bg-card p-4"
        >
          {/* Avatar / Icon */}
          <Skeleton width={52} height={52} circle />

          {/* Content */}
          <View className="ml-4 flex-1">
            {/* Notification title */}
            <Skeleton width="75%" height={17} />

            {/* Description */}
            <Skeleton className="mt-3" width="100%" height={13} />

            {/* <Skeleton className="mt-2" width="65%" height={13} /> */}

            {/* Time */}
            <Skeleton className="mt-4" width={60} height={11} />
          </View>
        </View>
      ))}
    </View>
  );
}
