import Skeleton from "@/components/ui/Skeleton";
import React from "react";
import { View } from "react-native";

interface UserCardListSkeletonProps {
  count?: number;
}

export default function UserCardListSkeleton({
  count = 8,
}: UserCardListSkeletonProps) {
  return (
    <View className="p-4">
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          className="flex-row items-center rounded-xl bg-card p-2"
        >
          {/* Profile Picture */}
          <Skeleton width={56} height={56} circle className="mr-4" />

          {/* User Info */}
          <View className="flex-1">
            <Skeleton width="55%" height={18} />
            <Skeleton className="mt-3" width="35%" height={13} />
          </View>

          {/* Follow / Message Button */}
          <Skeleton width={84} height={34} radius={17} />
        </View>
      ))}
    </View>
  );
}
