import { Colors } from "@/constants/Colors";
import React, { useEffect } from "react";
import { DimensionValue, StyleProp, ViewStyle } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface SkeletonProps {
  width?: DimensionValue;
  height?: number;

  radius?: number;

  circle?: boolean;

  style?: StyleProp<ViewStyle>;

  className?: string;
}

const AnimatedView = Animated.createAnimatedComponent(Animated.View);

export default function Skeleton({
  width = "100%",
  height = 16,
  radius = 8,
  circle = false,
  style,
  className = "",
}: SkeletonProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 900,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0.45, 1]),
  }));

  return (
    <Animated.View
      className={className}
      style={[
        {
          width,
          height,
          borderRadius: circle ? 999 : radius,
          backgroundColor: "#E5E7EB",
          //   backgroundColor: Colors.midGray,
        },
        animatedStyle,
        style,
      ]}
    />
  );
}
