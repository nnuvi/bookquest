import React from "react";
import { Text, TextStyle, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "@/constants/Colors";

type HeaderTextProps = {
  text: string;
  classname?: string;
  threeDotsVisible?: boolean;
  onPress?: () => void;
};

export const HeaderTitle = ({
  text,
  classname,
  threeDotsVisible = false,
  onPress,
}: HeaderTextProps) => {
  return (
    <View className="bg-primary flex-row justify-between p-3 px-4">
      <Text
        className={`font-bold text-4xl text-background ${classname ?? ""}`}
      >
        {text}
      </Text>
      {threeDotsVisible && (
        <TouchableOpacity onPress={onPress}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
