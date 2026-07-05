import { Octicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity, View } from "react-native";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  editable?: boolean;
  autoFocus?: boolean;
  onSearchPress?: () => void;
  onSubmitEditing?: () => void;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search",
  editable = true,
  autoFocus = false,
  onSearchPress,
  onSubmitEditing,
}: SearchBarProps) {
  return (
    <View className="flex-row items-center m-2 px-3 py-2">
      <TouchableOpacity onPress={onSearchPress}>
        <Octicons name="search" size={22} color="black" />
      </TouchableOpacity>
      <View className="flex-1 p-0.5 ml-3 rounded-full bg-input">
      <TextInput
        style={{ paddingHorizontal: 16 }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={editable}
        autoFocus={autoFocus}
        returnKeyType="search"
        onSubmitEditing={onSubmitEditing}
      />
      </View>
    </View>
  );
}