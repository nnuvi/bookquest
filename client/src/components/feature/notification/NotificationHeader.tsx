import { View, Text } from "react-native";
import NotificationBadge from "./NotificationBadge";

interface NotificationHeaderProps {
  title?: string;
  unreadCount: number;
}

const NotificationHeader = ({
  title = "Notifications",
  unreadCount,
}: NotificationHeaderProps) => {
  return (
    <>
      <View className="flex-row items-center justify-between px-5 py-3">
        <Text className="text-lg font-semibold text-selection">
          {title}
        </Text>

        <NotificationBadge count={unreadCount} />
      </View>

      <View className="h-0.5 bg-primary mx-5" />
    </>
  );
};

export default NotificationHeader;