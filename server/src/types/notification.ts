import { NotificationEvents } from "../model/Notification.model.js";

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
