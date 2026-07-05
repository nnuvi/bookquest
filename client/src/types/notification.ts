import { User } from "./user";

export const NotificationEvents = {
  FRIEND_REQUEST_SENT: "friend.request.sent",
  FRIEND_REQUEST_ACCEPTED: "friend.request.accepted",
  FRIEND_REQUEST_DECLINED: "friend.request.declined",

  BORROW_REQUEST_SENT: "borrow.request.sent",
  BORROW_REQUEST_APPROVED: "borrow.request.approved",
  BORROW_REQUEST_DECLINED: "borrow.request.declined",

  BOOK_ADDED_MANUAL: "book.added.manual",
  BOOK_ADDED_ISBN: "book.added.isbn",
  BOOK_ADDED_SCAN: "book.added.scan",

  BOOK_RETURNED: "book.returned",
  BOOK_OVERDUE: "book.overdue",

  SYSTEM_MESSAGE: "system.message",
} as const;

export type NotificationEvent =
  (typeof NotificationEvents)[keyof typeof NotificationEvents];

export interface Notification {
  _id: string;

  from?: User;
  to: User;

  event: NotificationEvent;
  message: string;

  book?: string;
  userBook?: string;

  isRead: boolean;
  readAt?: string;

  createdAt: string;
  updatedAt: string;
}
