import { View } from "react-native";

type SpacerProps = {
  size?: number;
  horizontal?: boolean;
};

export default function Spacer({
  size = 16,
  horizontal = false,
}: SpacerProps) {
  return (
    <View
      style={
        horizontal
          ? { width: size }
          : { height: size }
      }
    />
  );
}