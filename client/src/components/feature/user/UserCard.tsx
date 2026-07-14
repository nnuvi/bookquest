import { TouchableOpacity, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { User } from "@/types/user";
import { router } from "expo-router";

import Avatar from "@/components/ui/Avatar";

type UserCardProps = {
  user: User;
  action?: React.ReactNode;
  actionButton?: "bottom" | "right";
  onPress?: () => void;
  primaryButton?: {
    title: string;
    onPress: () => void;
  };

  secondaryButton?: {
    title: string;
    onPress: () => void;
  };
};

export default function UserCard({
  user,
  action,
  actionButton,
  onPress,
  primaryButton,
  secondaryButton,
}: UserCardProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`profile/ProfileView/${user?._id}`);
      }}
      className="flex-row items-center px-4 py-3"
    >
      <Avatar
        image={user.profileImage}
        size={actionButton === "bottom" ? "sm" : "xs"}
        // size="xs"
      />

      <View className="flex-1 ml-3">
        <AppText size="lg" weight="semibold" className="mr-1">
          {user.fullName}
        </AppText>

        <AppText size="base" className="mr-1">
          @{user.username}
        </AppText>
        {actionButton === "bottom" && <>{action}</>}
      </View>
      {actionButton === "right" && <>{action}</>}
    </TouchableOpacity>
  );
}
