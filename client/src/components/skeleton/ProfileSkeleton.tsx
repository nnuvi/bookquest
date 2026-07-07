import Skeleton from "@/components/ui/Skeleton";
import React from "react";
import { View } from "react-native";

export default function ProfileSkeleton() {
  return (
    <View className="flex-1 bg-background p-4">
      {/* Header */}
      <View className="justify-between p-2 pt-4">
        <View className="flex-row justify-between p-2">
          <Skeleton width={80} height={80} circle />

          <View className="flex-row justify-between items-center w-[50%] px-4">
            <Skeleton className="mt-3" width={70} height={50} />

            <Skeleton className="mt-3" width={70} height={50} />
          </View>
        </View>

        <View className="flex-col justify-around w-[65%]">
          <Skeleton className="mt-2" width="40%" height={20} />

          <Skeleton className="mt-2" width="70%" height={14} />
        </View>
      </View>

      {/* Stats */}
      {/* <View className="mt-8 flex-row justify-around">

        <View className="items-center">
          <Skeleton width={40} height={22} />
          <Skeleton className="mt-2" width={55} height={14} />
        </View>

        <View className="items-center">
          <Skeleton width={40} height={22} />
          <Skeleton className="mt-2" width={70} height={14} />
        </View>

        <View className="items-center">
          <Skeleton width={40} height={22} />
          <Skeleton className="mt-2" width={70} height={14} />
        </View>

      </View> */}

      {/* Buttons */}
      <View className="mt-4 flex-row">
        <Skeleton width="100%" height={42} radius={0} />

        {/* <View className="flex-1" />

        <Skeleton
          width="48%"
          height={42}
          radius={21}
        /> */}
      </View>

      {/* Recent Books */}
      <View className="mt-4">
        {[1, 2, 3].map((item) => (
          <View key={item} className="mb-4 flex-row">
            <Skeleton width={65} height={90} radius={8} />

            <View className="ml-4 flex-1 justify-center">
              <Skeleton width="75%" height={18} />

              <Skeleton className="mt-3" width="45%" height={14} />

              <Skeleton className="mt-5" width="90%" height={12} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
