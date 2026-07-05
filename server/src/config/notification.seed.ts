import Notification, {
  NotificationEvents,
} from "../model/Notification.model.js";

export async function createNotifications(
  users: any[],
  user_1: string,
  user_2: string
) {
  const notifications = [];

  for (const user of users) {
    notifications.push({
      from: user._id,
      to: user_1,
      event: NotificationEvents.FRIEND_REQUEST_SENT,
      message: `${user.fullName} sent you a friend request.`,
    });

    notifications.push({
      from: user._id,
      to: user_2,
      event: NotificationEvents.FRIEND_REQUEST_SENT,
      message: `${user.fullName} sent you a friend request.`,
    });

    notifications.push({
      from: user._id,
      to: user_1,
      event: NotificationEvents.BORROW_REQUEST_SENT,
      message: `${user.fullName} requested to borrow one of your books.`,
    });

    notifications.push({
      from: user._id,
      to: user_2,
      event: NotificationEvents.BORROW_REQUEST_SENT,
      message: `${user.fullName} requested to borrow one of your books.`,
    });
  }

  await Notification.insertMany(notifications);
}