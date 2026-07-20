import { TouchableOpacity, View } from "react-native";

import AppText from "@/components/ui/AppText";
import { User } from "@/types/user";
import { router } from "expo-router";

import Avatar from "@/components/ui/Avatar";
import { useAuthUser } from "@/hooks/auth";
import { navigate } from "@/lib/app";
import { ROUTES } from "@/constants/Routes";
import { LOG_SCOPE, logger } from "@/lib/logger";

type UserCardProps = {
  user: User;
  action?: React.ReactNode;
  actionButton?: "bottom" | "right";
  currentUserId?: string;
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
  currentUserId,
  onPress,
  primaryButton,
  secondaryButton,
}: UserCardProps) {
  const handleUserPress = () => {
    if (user._id === currentUserId) {
      logger.debug(LOG_SCOPE.router, "user current: ", { currentUserId });
      navigate(ROUTES.MY_PROFILE);
    } else {
      navigate(`/(app)/user/${user._id}`);
    }
  };
  return (
    <TouchableOpacity
      // onPress={() => {
      //   router.push(`profile/ProfileView/${user?._id}`);
      // }}
      onPress={handleUserPress}
      className="flex-row items-center"
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
