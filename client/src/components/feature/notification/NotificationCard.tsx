import { Image, Text, TouchableOpacity, View } from "react-native";

import { Notification } from "@/types/notification";
import { NotificationAction } from "@/services/notification.service";

interface NotificationCardProps {
  notification: Notification;
  actions?: NotificationAction[];
  onRead?: (id: string) => void;
  onAction: (
    notification: Notification,
    action: string
  ) => void;
}

const NotificationCard = ({
  notification,
  actions = [],
  onRead,
  onAction,
}: NotificationCardProps) => {
  const from = notification.from;

  const buttonColor = (variant: NotificationAction["variant"]) => {
    switch (variant) {
      case "success":
        return "bg-green-600";
      case "danger":
        return "bg-red-600";
      default:
        return "bg-primary";
    }
  };

  return (
    <View className="mx-5 my-2 rounded-xl border border-neutral bg-surface p-4">
      <View className="flex-row">
        <Image
          source={{
            uri:
              from?.profileImage ??
              "https://via.placeholder.com/60",
          }}
          className="h-14 w-14 rounded-full"
        />

        <View className="ml-3 flex-1">
          <Text className="text-base font-semibold text-white">
            {from?.fullName ?? "BookQuest"}
          </Text>

          <Text className="mt-1 text-sm text-gray-300">
            {notification.from?.fullName} {""}
            {notification.message}
          </Text>

          {!notification.isRead && (
            <View className="mt-2 self-start rounded-full bg-primary px-2 py-1">
              <Text className="text-xs font-semibold text-white">
                Unread
              </Text>
            </View>
          )}
        </View>
      </View>

      <View className="mt-4 flex-row flex-wrap justify-end">
        {!notification.isRead && onRead && (
          <TouchableOpacity
            className="mr-2 mb-2 rounded-lg bg-primary px-4 py-2"
            onPress={() => onRead(notification._id)}
          >
            <Text className="font-semibold text-white">
              Mark as Read
            </Text>
          </TouchableOpacity>
        )}

        {/* {actions.map((action) => (
          <TouchableOpacity
            key={action.action}
            className={`mr-2 mb-2 rounded-lg px-4 py-2 ${buttonColor(
              action.variant
            )}`}
            onPress={() => onAction(notification, action.action)}
          >
            <Text className="font-semibold text-white">
              {action.label}
            </Text>
          </TouchableOpacity>
        ))} */}
      </View>
    </View>
  );
};

export default NotificationCard;