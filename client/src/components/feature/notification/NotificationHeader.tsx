import { View, Text } from "react-native";
import NotificationBadge from "./NotificationBadge";
import AppText from "@/components/ui/AppText";

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
        <AppText size="lg" weight="semibold">
          {title}
        </AppText>

        <NotificationBadge count={unreadCount} />
      </View>

      <View className="h-0.5 bg-primary mx-5" />
    </>
  );
};

export default NotificationHeader;