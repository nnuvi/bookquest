import { TouchableOpacity } from "react-native";

import AppText from "./AppText";

type TabButtonProps = {
  title: string;
  active: boolean;
  onPress: () => void;
};

export default function TabButton({
  title,
  active,
  onPress,
}: TabButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`
        flex-1
        items-center
        justify-center
        rounded-full
        py-3
        ${active ? "bg-primary" : "bg-transparent"}
      `}
    >
      <AppText
        weight="semibold"
        color={active ? "light" : "default"}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
}