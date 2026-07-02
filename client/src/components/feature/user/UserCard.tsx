import { Image, TouchableOpacity, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { User } from "@/types/user";
import { router } from "expo-router";

import userPlaceHolder from "@assets/images/placeholder-user.png";
import Avatar from "@/components/ui/Avatar";

type UserCardProps = {
  user: User;
  action?: React.ReactNode;
  onPress?: () => void;
};

export default function UserCard({ user, action, onPress }: UserCardProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`profile/ProfileView/${user._id}`);
      }}
      className="flex-row items-center px-4 py-3"
    >
      <Avatar
        source={
          user.profileImage ? { uri: user.profileImage } : userPlaceHolder
        }
        size="xs"
      />

      <View className="flex-1 ml-3">
        <AppText size="lg" weight="semibold">
          {user.fullName}
        </AppText>

        <AppText size="md">@{user.username}</AppText>
      </View>

      {action}
    </TouchableOpacity>
  );
}
