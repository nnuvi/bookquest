import { BookSchemaType } from "@/model/Book.model.js";
import {
  NotificationDocument,
  NotificationEvents,
  NotificationSchemaType,
} from "../model/Notification.model.js";

import { UserSchemaType } from "@/model/user.model.js";

export type NotificationEvent =
  (typeof NotificationEvents)[keyof typeof NotificationEvents];

export interface CreateNotificationInput {
  from?: string;
  to: string;

  event: NotificationEvent;
  message: string;

  book?: string;
  userBook?: string;
}

// export type PopulatedNotificationDocument = Omit<
//   NotificationDocument,
//   "from" | "book" | "userBook"
// > & {
//   from: UserDocument | null;
//   book: BookDocument | null;
//   userBook: UserBookDocument | null;
// };

export type NotificationDto = Omit<
  NotificationSchemaType,
  "from" | "to" | "book" | "userBook"
> & {
  _id: string;

  from: {
    _id: string;
    fullName: string;
    username: string;
    profileImage?: string;
  } | null;

  to: string;

  book?: {
    _id: string;
    title: string;
    coverImage?: string;
  } | null;

  userBook?: {
    _id: string;
  } | null;
};

export function mapNotification(notification: NotificationDto) {
  return {
    _id: notification._id,

    event: notification.event,
    message: notification.message,

    isRead: notification.isRead,
    readAt: notification.readAt,
    createdAt: notification.createdAt,
    updatedAt: notification.updatedAt,

    from: notification.from
      ? {
          id: notification.from._id,
          fullName: notification.from.fullName,
          username: notification.from.username,
          profileImage: {
            url: notification.from.profileImage,
          },
        }
      : null,

    to: notification.to,

    book: notification.book
      ? {
          id: notification.book._id,
          title: notification.book.title,
          coverImage: notification.book.coverImage,
        }
      : null,

    userBook: notification.userBook
      ? {
          id: notification.userBook._id,
        }
      : null,
  };
}

// export const FriendRequestActionEvents: Record<
//   FriendRequestAction,
//   NotificationEvent
// > = {
//   accepted: NotificationEvents.FRIEND_REQUEST_ACCEPTED,
//   declined: NotificationEvents.FRIEND_REQUEST_DECLINED,
// };

// export type BorrowRequestAction = "approved" | "declined";

// export interface FriendRequestNotificationInput {
//   senderId: string;
//   receiverId: string;
//   senderName: string;
// }

// export interface FriendRequestRespondNotificationInput extends FriendRequestNotificationInput {
//   action: FriendRequestAction;
// }

// export interface BorrowNotificationInput {
//   borrowerId: string;
//   ownerId: string;

//   borrowerName: string;

//   bookId: string;
//   userBookId: string;

//   bookTitle: string;
// }

// export interface BorrowReplyNotificationInput extends BorrowNotificationInput {
//   action: BorrowRequestAction;
// }
