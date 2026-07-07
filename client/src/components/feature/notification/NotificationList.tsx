import { FlatList } from "react-native";

import EmptyState from "@/components/common/EmptyState";
import NotificationCard from "./NotificationCard";

import { Notification } from "@/types/notification";
import { getNotificationActions } from "@/services/notification.service";

interface NotificationListProps {
  notifications: Notification[];

  onRead?: (id: string) => void;

  onAction: (notification: Notification, action: string) => void;

  refreshing?: boolean;
  onRefresh?: () => void;
}

const NotificationList = ({
  notifications,
  onRead,
  onAction,
  refreshing = false,
  onRefresh,
}: NotificationListProps) => {
  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <NotificationCard
          notification={item}
          onRead={onRead}
          actions={getNotificationActions(item)}
          onAction={onAction}
        />
      )}
      ListEmptyComponent={
        <EmptyState
          title="No Notifications"
          description="Notifications will appear here."
        />
      }
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: 8,
        paddingBottom: 150,
      }}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default NotificationList;
