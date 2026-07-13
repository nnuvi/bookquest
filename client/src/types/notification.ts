import { Book, UserBook } from "./book";
import { User } from "./user";

export const NotificationEvents = {
  FRIEND_REQUEST_SENT: "friend.request.sent",
  FRIEND_REQUEST_ACCEPTED: "friend.request.accepted",
  FRIEND_REQUEST_DECLINED: "friend.request.declined",

  BORROW_REQUEST_SENT: "borrow.request.sent",
  BORROW_REQUEST_APPROVED: "borrow.request.approved",
  BORROW_REQUEST_DECLINED: "borrow.request.declined",
  BORROW_REQUEST_CANCELLED: "borrow.request.cancelled",

  RETURN_REQUEST_SENT: "return.request.sent",
  RETURN_REQUEST_APPROVED: "return.request.approved",
  RETURN_REQUEST_DECLINED: "return.request.declined",
  RETURN_REQUEST_CANCELLED: "return.request.cancelled",
  RETURN_REMINDER_SENT: "return.reminder.sent",

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

  book?: Book;
  userBook?: UserBook;

  isRead: boolean;
  readAt?: string;

  createdAt: string;
  updatedAt: string;
}
