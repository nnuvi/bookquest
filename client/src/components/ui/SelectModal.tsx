import { FlatList, Pressable, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import AppModal from "./AppModal";
import AppText from "./AppText";
import { Colors } from "@/constants/Colors";

export type SelectOption<T extends string> = {
  label: string;
  value: T;
};

type SelectModalProps<T extends string> = {
  visible: boolean;
  title?: string;

  options: readonly SelectOption<T>[];

  value?: T;

  onSelect: (value: T) => void;
  onClose: () => void;
};

export default function SelectModal<T extends string>({
  visible,
  title = "Select",
  options,
  value,
  onSelect,
  onClose,
}: SelectModalProps<T>) {
  return (
    <AppModal visible={visible} onClose={onClose}>
      <AppText
        size="2xl"
        weight="bold"
        color="primary"
        className="mb-4 text-center"
      >
        {title}
      </AppText>

      <View>
        {options.map((item) => {
          const selected = item.value === value;

          return (
            <Pressable
              key={item.value}
              className="relative items-center justify-center py-4"
              onPress={() => {
                onSelect(item.value);
                onClose();
              }}
            >
              <AppText
                size="lg"
                weight={selected ? "semibold" : "regular"}
                className="text-center"
              >
                {item.label}
              </AppText>

              {selected && (
                <Ionicons
                  name="checkmark"
                  size={22}
                  color={Colors.success}
                  style={{
                    position: "absolute",
                    right: 0,
                  }}
                />
              )}
            </Pressable>
          );
        })}
      </View>
    </AppModal>
  );
}
