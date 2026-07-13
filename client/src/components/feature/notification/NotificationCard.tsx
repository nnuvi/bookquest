import { Image, Pressable, TouchableOpacity, View } from "react-native";

import { Notification } from "@/types/notification";
import { NotificationAction } from "@/services/notification.service";
import AppText from "@/components/ui/AppText";
import { router } from "expo-router";
import { getNotificationTitle } from "@/services/notification.mapper";
import userPlaceHolder from "@assets/images/placeholder-user.png";
import Avatar from "@/components/ui/Avatar";

interface NotificationCardProps {
  notification: Notification;
  actions?: NotificationAction[];
  onRead?: (id: string) => void;
  onAction: (notification: Notification, action: string) => void;
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
    <View className="mx-5 my-2 rounded-2xl shadow-sm p-4">
      <View className="flex-row">
        <Avatar
          source={
            notification.from?.profileImage
              ? { uri: notification.from.profileImage }
              : userPlaceHolder
          }
          size={"xs"}
          // size="xs"
        />

        <View className="ml-3 flex-1">
          <View className="flex-row items-center gap-2">
            <AppText size="lg" weight="semibold">
              {getNotificationTitle(notification.event)}
            </AppText>

            {!notification.isRead && (
              <View className="rounded-full bg-primary px-2 py-1">
                <AppText size="xs" color="selection">
                  Unread
                </AppText>
              </View>
            )}
          </View>

          <AppText className="mt-1">
            {notification.from && (
              <AppText
                weight="semibold"
                color="primary"
                onPress={() =>
                  router.push(`/profile/ProfileView/${notification?.from?._id}`)
                }
              >
                {notification.from.fullName}
              </AppText>
            )}{" "}
            {notification.message}{" "}
            {notification.userBook?.book && (
              <AppText
                weight="semibold"
                color="primary"
                onPress={() =>
                  router.push(
                    `/books/UserBookDetails/${notification?.userBook?._id}`,
                  )
                }
              >
                {notification.userBook.book.title}
              </AppText>
            )}
          </AppText>
        </View>
      </View>

      {/* <View className="mt-4 flex-row flex-wrap justify-end"> */}
      {!notification.isRead && onRead && (
        <TouchableOpacity
          className="mt-4 mr-2 mb-2 rounded-lg bg-primary px-4 py-2"
          onPress={() => onRead(notification._id)}
        >
          <AppText color="selection" weight="semibold">
            Mark as Read
          </AppText>
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
            <AppText className="font-semibold AppText-white">
              {action.label}
            </AppText>
          </TouchableOpacity>
        ))} */}
      {/* </View> */}
    </View>
  );
};

export default NotificationCard;
