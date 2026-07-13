import { NotificationEvents } from "@/types/notification";

export function getNotificationTitle(type: string) {
  switch (type) {
    case NotificationEvents.FRIEND_REQUEST_SENT:
      return "Friend Request";

    case NotificationEvents.FRIEND_REQUEST_ACCEPTED:
      return "Friend Request Accepted";

    case NotificationEvents.FRIEND_REQUEST_DECLINED:
      return "Friend Request Declined";

    case NotificationEvents.BORROW_REQUEST_SENT:
      return "Borrow Request";

    case NotificationEvents.BORROW_REQUEST_APPROVED:
      return "Borrow Request Approved";

    case NotificationEvents.BORROW_REQUEST_DECLINED:
      return "Borrow Request Declined";

    case NotificationEvents.BORROW_REQUEST_CANCELLED:
      return "Borrow Request Cancelled";

    case NotificationEvents.RETURN_REQUEST_SENT:
      return "Return Request";

    case NotificationEvents.RETURN_REQUEST_APPROVED:
      return "Return Completed";

    case NotificationEvents.RETURN_REQUEST_DECLINED:
      return "Return Declined";

    case NotificationEvents.RETURN_REQUEST_CANCELLED:
      return "Return Cancelled";

    case NotificationEvents.RETURN_REMINDER_SENT:
      return "Return Reminder";

    case NotificationEvents.BOOK_ADDED_MANUAL:
    case NotificationEvents.BOOK_ADDED_ISBN:
    case NotificationEvents.BOOK_ADDED_SCAN:
      return "Book Added";

    case NotificationEvents.BOOK_RETURNED:
      return "Book Returned";

    case NotificationEvents.BOOK_OVERDUE:
      return "Book Overdue";

    case NotificationEvents.SYSTEM_MESSAGE:
      return "BookQuest";

    default:
      return "Notification";
  }
}