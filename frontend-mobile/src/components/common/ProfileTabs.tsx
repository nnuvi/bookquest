import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity, View } from "react-native";

import AppText from "@/components/common/AppText";
import {Colors} from "@/constants/Colors";

type TabType = "list" | "borrowed" | "lent";

type ProfileTabsProps = {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
  onAddPress?: () => void;
};

export default function ProfileTabs({
  activeTab,
  onChange,
  onAddPress,
}: ProfileTabsProps) {
  return (
    <View className="flex-row justify-around items-center bg-primary p-2 mt-2">
      <TouchableOpacity
        className="items-center justify-center"
        onPress={() => onChange("list")}
      >
        <Ionicons
          name="list-outline"
          size={20}
          color={
            activeTab === "list"
              ? Colors.selection
              : Colors.background
          }
        />

        <AppText
          className={`mb-1 ${
            activeTab === "list"
              ? "font-bold text-selection"
              : "text-background"
          }`}
        >
          List
        </AppText>
      </TouchableOpacity>

      <TouchableOpacity
        className="items-center justify-center"
        onPress={() => onChange("borrowed")}
      >
        <MaterialCommunityIcons
          name="book-plus-multiple"
          size={19}
          color={
            activeTab === "borrowed"
              ? Colors.selection
              : Colors.background
          }
        />

        <AppText
          className={`mb-1 ${
            activeTab === "borrowed"
              ? "font-bold text-selection"
              : "text-background"
          }`}
        >
          Borrowed
        </AppText>
      </TouchableOpacity>

      <TouchableOpacity
        className="items-center justify-center"
        onPress={() => onChange("lent")}
      >
        <MaterialCommunityIcons
          name="book-minus-multiple"
          size={19}
          color={
            activeTab === "lent"
              ? Colors.selection
              : Colors.background
          }
        />

        <AppText
          className={`mb-1 ${
            activeTab === "lent"
              ? "font-bold text-selection"
              : "text-background"
          }`}
        >
          Lent
        </AppText>
      </TouchableOpacity>

      <TouchableOpacity
        className="items-center justify-center"
        onPress={onAddPress}
      >
        <MaterialIcons
          name="library-add"
          size={19}
          color={Colors.background}
        />

        <AppText className="text-background">
          Add
        </AppText>
      </TouchableOpacity>
    </View>
  );
}