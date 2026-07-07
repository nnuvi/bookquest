import Skeleton from "@/components/ui/Skeleton";
import React from "react";
import { View } from "react-native";

export default function BookDetailsSkeleton() {
  return (
    <View className="flex-1 bg-background p-5">
      {/* Header */}
      <View className="flex-row">
        <Skeleton width={112} height={160} radius={12} />

        <View className="ml-5 py-4 flex-1 justify-between">
          <View className="justify-start">
            <Skeleton width="90%" height={26} />

            <Skeleton className="mt-3" width="60%" height={16} />
          </View>

          <Skeleton className="mt-6" width={90} height={18} />

          {/* <View className="mt-5 flex-row">
            <Skeleton width={60} height={26} radius={13} />

            <Skeleton className="ml-3" width={75} height={26} radius={13} />
          </View> */}
        </View>
      </View>

      {/* Buttons */}
      {/* <View className="mt-8 flex-row">
        <Skeleton width="48%" height={44} radius={22} />

        <View className="flex-1" />

        <Skeleton width="48%" height={44} radius={22} />
      </View> */}

      {/* Information */}
      <View className="mt-6">
        {[1, 2, 3, 4].map((item) => (
          <View key={item} className="mb-4 flex-row justify-between">
            <Skeleton width={"28%"} height={15} />

            <Skeleton width={"70%"} height={15} />
          </View>
        ))}
      </View>

      {/* Description */}
      <View className="mt-4">
        <Skeleton width={130} height={20} />

        <Skeleton className="mt-4" width="100%" height={14} />

        <Skeleton className="mt-2" width="95%" height={14} />

        <Skeleton className="mt-2" width="85%" height={14} />

        <Skeleton className="mt-2" width="70%" height={14} />
      </View>

      {/* Reviews */}
      {/* <View className="mt-8">
        <Skeleton width={120} height={20} />

        {[1, 2].map((item) => (
          <View key={item} className="mt-5 flex-row">
            <Skeleton width={45} height={45} circle />

            <View className="ml-3 flex-1">
              <Skeleton width="40%" height={16} />

              <Skeleton className="mt-3" width="95%" height={12} />

              <Skeleton className="mt-2" width="80%" height={12} />
            </View>
          </View>
        ))}
      </View> */}
    </View>
  );
}
