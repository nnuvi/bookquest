import { Image, TouchableOpacity, View } from "react-native";

import AppText from "@/components/common/AppText";
import { User } from "@/types/user";
import { router } from "expo-router";

import userPlaceHolder from "@assets/images/placeholder-user.png";

type UserCardProps = {
  user: User;
  action?: React.ReactNode;
  onPress?: () => void;
};

export default function UserCard({ user, action, onPress }: UserCardProps) {
  console.log(user);
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`profile/ProfileView/${user._id}`);
      }}
      className="flex-row items-center px-4 py-3 border-b border-gray-300"
    >
      <Image
        source={user.profieImage ? { uri: user.profieImage } : userPlaceHolder}
        className="w-14 h-14 rounded-full bg-gray-300"
      />

      <View className="flex-1 ml-3">
        <AppText className="font-semibold text-base">{user.fullName}</AppText>

        <AppText className="text-gray-500">@{user.username}</AppText>
      </View>

      {action}
    </TouchableOpacity>
  );
}
