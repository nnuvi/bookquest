import { TouchableOpacity, Text } from "react-native";

interface Props {
  title: string;
  active: boolean;
  onPress: () => void;
}

export default function RequestTabButton({
  title,
  active,
  onPress,
}: Props) {
  return (
    <>
    <TouchableOpacity
      onPress={onPress}
      className={`flex-1 rounded-full py-3 ${
        active
          ? "bg-primary"
          : "bg-transparent"
      }`}
    >
      <Text
        className={`text-center font-semibold ${
          active
            ? "text-background"
            : "text-text"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
    </>
  );
}