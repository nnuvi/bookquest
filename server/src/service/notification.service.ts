import logger from "../config/logger.js";
import Notification from "../model/Notification.model.js";
import type {
  CreateNotificationInput,
  NotificationEvent,
} from "../types/notification.js";

export async function createNotification(input: CreateNotificationInput) {
  return Notification.create(input);
}

export async function getNotifications(userId: string) {
  const notifications = await Notification.find({
    to: userId,
  })
    .populate("from", "fullName username profileImage")
    .populate({
      path: "userBook",
      populate: {
        path: "book",
        select: "title author coverImage",
      },
    })
    .sort({
      createdAt: -1,
    });

  await Notification.updateMany(
    {
      to: userId,
      isRead: false,
    },
    {
      isRead: true,
      readAt: new Date(),
    },
  );

  // logger.debug("getNotificatios: ", notifications);

  return {
    success: true,
    data: notifications,
  };
}
