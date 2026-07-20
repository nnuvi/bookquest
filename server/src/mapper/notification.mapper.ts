// import { NotificationDocument, NotificationSchemaType } from "@/model/Notification.model.js";
// import {
//   NotificationDto,
//   PopulatedNotificationType,
// } from "@/types/notification.js";

// export function mapNotification(
//   notification: NotificationDocument,
// ): NotificationDto {
//   return {
//     _id: notification._id.toString(),
//     event: notification.event,
//     message: notification.message,
//     isRead: notification.isRead,
//     readAt: notification.readAt,
//     createdAt: notification.createdAt,
//     updatedAt: notification.updatedAt,

//     from: notification.from
//       ? {
//           _id: notification.from._id.toString(),
//           fullName: notification.from.fullName,
//           username: notification.from.username,
//           profileImage: notification.from.profileImage?.url,
//         }
//       : null,

//     to: notification.to.toString(),

//     book: notification.book
//       ? {
//           _id: notification.book._id.toString(),
//           title: notification.book.title,
//           coverImage: notification.book.coverImage,
//         }
//       : null,

//     userBook: notification.userBook
//       ? {
//           _id: notification.userBook._id.toString(),
//         }
//       : null,
//   };
// }
