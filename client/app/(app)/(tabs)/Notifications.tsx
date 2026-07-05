import { useEffect, useState } from "react";

import Screen from "@/components/common/Screen";
import { HeaderTitle } from "@/components/common/HeaderTitle";
import NotificationHeader from "@/components/feature/notification/NotificationHeader";
import NotificationList from "@/components/feature/notification/NotificationList";

import { api } from "@/lib/api";
import { Notification, NotificationEvents } from "@/types/notification";
import { useNotification } from "@/hooks/notification";
import NotificationCardSkeleton from "@/components/skeleton/NotificationCardSkeleton";
import ErrorScreen from "@/components/feedback/ErrorScreen";
import NotFoundScreen from "@/components/feedback/NotFoundScreen";
import { getNotificationActions } from "@/services/notification.service";

export default function NotificationScreen() {
  const {
    data: notifications,
    refetch,
    isRefetching,
    isPending,
    isError,
  } = useNotification();

  // const markAsRead = async (id: string) => {
  //   try {
  //     await api.patch(`/notifications/${id}/read`);

  //     setNotifications((prev) =>
  //       prev.map((notification) =>
  //         notification._id === id
  //           ? { ...notification, isRead: true }
  //           : notification,
  //       ),
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleNotificationAction = async (
  //   notification: Notification,
  //   action: string,
  // ) => {
  //   switch (notification.event) {
  //     case NotificationEvents.BORROW_REQUEST_SENT:
  //       await api.put("/books/approveDecline", {
  //         notificationId: notification._id,
  //         action,
  //       });
  //       break;

  //     case NotificationEvents.FRIEND_REQUEST_SENT:
  //       await api.put("/friends/respond", {
  //         notificationId: notification._id,
  //         action,
  //       });
  //       break;

  //     default:
  //       return;
  //   }

  //   await getAllNotifications();
  // };

  return (
    <Screen>
      <HeaderTitle text="Notifications" />
      {isPending ? (
        <NotificationCardSkeleton />
      ) : isError ? (
        <ErrorScreen
          title="Failed to load notifications"
          description="There was an error while fetching notifications. Please try again later."
          retryText="Retry"
          onRetry={refetch}
        />
      ) : (
        <>
          <NotificationHeader
            title="Unread Notifications"
            unreadCount={
              notifications.filter((notification) => !notification.isRead)
                .length
            }
          />

          <NotificationList
            notifications={notifications}
            // onRead={markAsRead}
            onAction={getNotificationActions}
            refreshing={isRefetching}
            onRefresh={refetch}
          />
        </>
      )}
    </Screen>
  );
}
