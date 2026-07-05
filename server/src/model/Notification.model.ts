import mongoose, { InferSchemaType, model } from "mongoose";
// import { NotificationEvents } from "../constant/notification.js";

const { Schema } = mongoose;

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

export const NotificationEventEnum = Object.values(NotificationEvents);

// export type NotificationEvent = (typeof NotificationEventEnum)[number];

const NotificationSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null, // system notifications may not have sender
    },

    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    event: {
      type: String,
      enum: NotificationEventEnum,
      required: true,
      index: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      default: null,
    },

    userBook: {
      type: Schema.Types.ObjectId,
      ref: "UserBook",
      default: null,
    },

    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },

    readAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export type NotificationSchemaType = InferSchemaType<typeof NotificationSchema>;

const Notification = model<NotificationSchemaType>(
  "Notification",
  NotificationSchema,
);

export default Notification;
