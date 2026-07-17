import { View } from "react-native";

import TabButton from "./TabButton";

export type TabOption<T extends string> = {
  label: string;
  value: T;
};

type TabsProps<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  tabs: readonly TabOption<T>[];
};

export default function Tabs<T extends string>({
  value,
  onChange,
  tabs,
}: TabsProps<T>) {
  return (
    <View className="my-3 mx-3 flex-row rounded-full bg-neutral p-1">
      {tabs.map((tab) => (
        <TabButton
          key={tab.value}
          title={tab.label}
          active={tab.value === value}
          onPress={() => onChange(tab.value)}
        />
      ))}
    </View>
  );
}