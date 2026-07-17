import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { Colors } from "@/constants/Colors";
import AddBookModal from "../add/AddBookModal";
import { useState } from "react";

type TabType = "list" | "borrowed" | "lent";

type ProfileTabsProps = {
  activeTab: TabType;
  onChange?: (tab: TabType) => void;
  onAddPress?: () => void;
  currentUser?: boolean;
};

export default function ProfileTabs({
  activeTab,
  onChange,
  onAddPress,
  currentUser = true,
}: ProfileTabsProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  return (
    <View className="flex-row justify-around items-center bg-primary p-2 mt-2">
      <TouchableOpacity
        className="px-3 items-center justify-center"
        onPress={() => onChange?.("list")}
      >
        <Ionicons
          name="list-outline"
          size={20}
          color={activeTab === "list" ? Colors.selection : Colors.background}
        />

        <AppText
          weight={activeTab === "list" ? "bold" : "regular"}
          color={activeTab === "list" ? "selection" : "light"}
          // className="mb-1"
        >
          List
        </AppText>
      </TouchableOpacity>

      {currentUser && (
        <TouchableOpacity
          className="px-3 items-center justify-center"
          onPress={() => onChange?.("borrowed")}
        >
          <MaterialCommunityIcons
            name="book-plus-multiple"
            size={19}
            color={
              activeTab === "borrowed" ? Colors.selection : Colors.background
            }
          />

          <AppText
            weight={activeTab === "borrowed" ? "bold" : "regular"}
            color={activeTab === "borrowed" ? "selection" : "light"}
            // className="mb-1"
          >
            Borrowed
          </AppText>
        </TouchableOpacity>
      )}

      {currentUser && (
        <TouchableOpacity
          className="px-3 items-center justify-center"
          onPress={() => onChange?.("lent")}
        >
          <MaterialCommunityIcons
            name="book-minus-multiple"
            size={19}
            color={activeTab === "lent" ? Colors.selection : Colors.background}
          />

          <AppText
            weight={activeTab === "lent" ? "bold" : "regular"}
            color={activeTab === "lent" ? "selection" : "light"}
            // className="mb-1"
          >
            Lent
          </AppText>
        </TouchableOpacity>
      )}

      {currentUser && (
        <TouchableOpacity
          className="px-3 items-center justify-center"
          onPress={() => setShowAddModal(true)}
        >
          <MaterialIcons
            name="library-add"
            size={19}
            color={Colors.background}
          />

          <AppText color="light">Add</AppText>
        </TouchableOpacity>
      )}

      <AddBookModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </View>
  );
}
