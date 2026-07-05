import { api } from "@/lib/api";
import { LOG_SCOPE, logger } from "@/lib/logger";
import { ApiResponse } from "@/types/api";
import { Notification, NotificationEvents } from "@/types/notification";


export const getNotifications = async (): Promise<Notification[]> => {
  const { data } = await api.get<ApiResponse<Notification[]>>(`/api/notification`);
  // logger.info(LOG_SCOPE.notification, "Fetched notifications:", data.data);
  return data.data;
};

export interface NotificationAction {
  label: string;
  variant: "primary" | "success" | "danger";
  action: string;
}

export const getNotificationActions = (
  notification: Notification
): NotificationAction[] => {
  switch (notification.event) {
    case NotificationEvents.BORROW_REQUEST_SENT:
      return [
        {
          label: "Accept",
          variant: "success",
          action: "accept",
        },
        {
          label: "Decline",
          variant: "danger",
          action: "decline",
        },
      ];

    case NotificationEvents.FRIEND_REQUEST_SENT:
      return [
        {
          label: "Accept",
          variant: "success",
          action: "accept",
        },
        {
          label: "Decline",
          variant: "danger",
          action: "decline",
        },
      ];

    default:
      return [];
  }
};