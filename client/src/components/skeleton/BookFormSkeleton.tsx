import Skeleton from "@/components/ui/Skeleton";
import React from "react";
import { View } from "react-native";
import FieldSkeleton from "./FieldSkeleton";
import ButtonSkeleton from "./ButtonSkeleton";

interface BookFormSkeletonProps {
  count?: number;
}

export default function BookFormSkeleton({ count = 4 }: BookFormSkeletonProps) {
  return (
    <View className="p-4 flex-1">
      <View className="rounded-xl justify-center bg-card">
        <View className="items-center">
          <Skeleton width={105} height={170} radius={8} />
        </View>

        <View className="flex-1 justify-center">
          <FieldSkeleton count={count} />
          {/* <Skeleton width="90%" height={20} />

            <Skeleton className="mt-3" width="60%" height={15} />

            <Skeleton className="mt-5" width="90%" height={12} /> */}
          <FieldSkeleton count={1} multiline />
        </View>
      </View>
      {/* <ButtonSkeleton variant="double" /> */}
    </View>
  );
}
