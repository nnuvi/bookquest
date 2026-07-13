import { View } from "react-native";

import AppText from "./AppText";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function Section({
  title,
  children,
}: Props) {
  return (
    <View>
      <AppText size="xl" weight="bold">
        {title}
      </AppText>

      <View className="mt-2">
        {children}
      </View>
    </View>
  );
}