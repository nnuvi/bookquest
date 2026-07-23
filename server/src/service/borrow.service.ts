import ApiError from "../lib/ApiError.js";
import logger from "../config/logger.js";
import { HTTP_STATUS } from "../constant/httpStatus.js";
import BorrowRequest, {
  BorrowRequestSchemaType,
  BorrowRequestStatus,
} from "../model/BorrowRequest.model.js";
import {
  ensureBookAvailability,
  ensureNotBookOwner,
  getUserBookOrThrow,
  updateBookAvailability,
} from "./book.service.js";
import BorrowRecord from "../model/BorrowRecord.model.js";
import { createNotification } from "./notification.service.js";
import { NotificationEvents } from "../model/Notification.model.js";
import ReturnRequest from "../model/ReturnRequest.model.js";
import { BorrowStatusResponse } from "../types/borrow.js";
import { createBorrowRecord } from "./record.service.js";

export async function getBorrowRequests(userId: string) {
  const borrowRequests = await BorrowRequest.find({
    owner: userId,
    status: "pending",
  })
    .populate("requester", "fullName username profileImage")
    .populate({
      path: "userBook",
      populate: {
        path: "book",
        select: "title author coverImage",
      },
    })
    .sort({ createdAt: -1 });

  const validBorrowRequests = borrowRequests.filter(
    (r) => r.requester && r.owner && r.userBook,
  );

  logger.debug("getBorrowRequests: ", borrowRequests);

  return {
    success: true,
    data: validBorrowRequests,
  };
}

export async function getSentBorrowRequests(userId: string) {
  const borrowSentRequests = await BorrowRequest.find({
    requester: userId,
    status: "pending",
  })
    .populate("owner", "fullName username profileImage")
    .populate({
      path: "userBook",
      populate: {
        path: "book",
        select: "title author coverImage",
      },
    })
    .sort({ createdAt: -1 });

  const validSentBorrowRequests = borrowSentRequests.filter(
    (r) => r.requester && r.owner && r.userBook,
  );

  logger.debug("getBorrowSentRequests: ", borrowSentRequests);

  return {
    success: true,
    data: validSentBorrowRequests,
  };
}

export async function sendBorrowRequest(
  requesterId: string,
  userBookId: string,
  borrowDurationDays: number,
  message = "",
) {
  const userBook = await getUserBookOrThrow(userBookId);

  ensureNotBookOwner(userBook, requesterId);
  ensureBookAvailability(userBook, "available");
  await ensureNoDuplicateBorrowRequest(requesterId, userBookId);

  const borrowRequest = await createBorrowRequest(
    requesterId,
    userBook.owner.toString(),
    userBookId,
    borrowDurationDays,
    message,
  );

  await createNotification({
    from: requesterId,
    to: userBook.owner.toString(),
    userBook: userBookId,
    event: NotificationEvents.BORROW_REQUEST_SENT,
    message: "sent you a borrow request for the book",
  });

  return borrowRequest;
}

export async function respondBorrowRequest(
  requestId: string,
  ownerId: string,
  action: BorrowRequestStatus,
) {
  logger.debug("status in respond service: ", {
    requestId,
    ownerId,
    action,
  });
  const request = await getBorrowRequestOrThrow(requestId);
  const requesterId = request.requester.toString();
  const userBookId = request.userBook.toString();

  ensurePendingBorrowRequest(request);

  await updateBorrowRequestStatus(requestId, action);

  if (action === "accepted") {
    await createBorrowRecord(request);
    await createNotification({
      from: ownerId,
      to: requesterId,
      userBook: userBookId,
      event: NotificationEvents.BORROW_REQUEST_APPROVED,
      message: `acceped your Borrow Request for the book`,
    });
    await cancelPendingBorrowRequests(userBookId, requestId);
    await updateBookAvailability(userBookId, "borrowed");
  } else if (action === "declined") {
    await updateBorrowRequestStatus(requestId, "declined");
    await createNotification({
      from: ownerId,
      to: requesterId,
      userBook: userBookId,
      event: NotificationEvents.BORROW_REQUEST_DECLINED,
      message: `declined your Borrow Request for the book`,
    });
  }

  return request;
}

// create borrow request
// my requests
// my sent requests

export async function createBorrowRequest(
  requesterId: string,
  ownerId: string,
  userBookId: string,
  borrowDurationDays: number,
  message = "",
) {
  logger.debug("Borrow request before createBorrowRequest", {
    requester: requesterId,
    owner: ownerId,
    userBook: userBookId,
    borrowDurationDays,
    message,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  });
  const borrowRequest = await BorrowRequest.create({
    requester: requesterId,
    owner: ownerId,
    userBook: userBookId,
    borrowDurationDays,
    message,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  });

  logger.debug("Borrow request after createBorrowRequest", borrowRequest);

  return borrowRequest;
}

export async function getPendingBorrowRequest(
  requesterId: string,
  userBookId: string,
) {
  return BorrowRequest.findOne({
    requester: requesterId,
    userBook: userBookId,
    status: "pending",
  });
}

export async function cancelBorrowRequest(
  requestId: string,
  requesterId: string,
) {
  const request = await getBorrowRequestOrThrow(requestId);

  ensureBorrowRequester(request, requesterId);

  ensurePendingBorrowRequest(request);

  await updateBorrowRequestStatus(requestId, "cancelled");

  return request;
}

// export async function getBorrowStatus(userId: string, userBookId: string) {
//   const userBook = await getUserBookOrThrow(userBookId);
//   const ownerId = userBook.owner.toString();

//   // User owns the book
//   if (ownerId === userId) {
//     const incomingRequest = await BorrowRequest.findOne({
//       owner: userId,
//       userBook: userBookId,
//       status: "pending",
//     });

//     if (incomingRequest) {
//       return {
//         status: "incoming-request",
//         requestId: incomingRequest._id.toString(),
//       };
//     }

//     return {
//       status: "owner",
//     };
//   }

//   // User is currently borrowing this book
//   const borrowRecord = await BorrowRecord.findOne({
//     borrower: userId,
//     userBook: userBookId,
//     status: "borrowed",
//   });

//   if (borrowRecord) {
//     return {
//       status: "borrowed",
//       borrowRecordId: borrowRecord._id.toString(),
//     };
//   }

//   // User has already requested this book
//   const pendingRequest = await BorrowRequest.findOne({
//     requester: userId,
//     userBook: userBookId,
//     status: "pending",
//   });

//   if (pendingRequest) {
//     return {
//       status: "request-pending",
//       requestId: pendingRequest._id.toString(),
//     };
//   }

//   // Book is available
//   if (userBook.availability === "available") {
//     return {
//       status: "available",
//     };
//   }

//   // Someone else currently has the book
//   return {
//     status: "unavailable",
//   };
// }

// export async function getBorrowStatus(userId: string, userBookId: string) {
//   const userBook = await getUserBookOrThrow(userBookId);
//   const ownerId = userBook.owner.toString();

//   // ----------------------------------------------------
//   // Owner
//   // ----------------------------------------------------
//   if (ownerId === userId) {
//     const incomingRequest = await BorrowRequest.findOne({
//       owner: userId,
//       userBook: userBookId,
//       status: "pending",
//     });

//     if (incomingRequest) {
//       return {
//         status: "incoming-request" as const,
//         requestId: incomingRequest._id.toString(),
//       };
//     }

//     // Someone is currently borrowing my book
//     const lendingRecord = await BorrowRecord.findOne({
//       owner: userId,
//       userBook: userBookId,
//       status: "borrowed",
//     });

//     if (lendingRecord) {
//       return {
//         status: "lending" as const,
//         borrowRecordId: lendingRecord._id.toString(),
//       };
//     }

//     return {
//       status: "owner" as const,
//     };
//   }

//   // ----------------------------------------------------
//   // Borrower
//   // ----------------------------------------------------
//   const borrowingRecord = await BorrowRecord.findOne({
//     borrower: userId,
//     userBook: userBookId,
//     status: "borrowed",
//   });

//   if (borrowingRecord) {
//     return {
//       status: "borrowing" as const,
//       borrowRecordId: borrowingRecord._id.toString(),
//     };
//   }

//   // ----------------------------------------------------
//   // Pending request
//   // ----------------------------------------------------
//   const pendingRequest = await BorrowRequest.findOne({
//     requester: userId,
//     userBook: userBookId,
//     status: "pending",
//   });

//   if (pendingRequest) {
//     return {
//       status: "request-pending" as const,
//       requestId: pendingRequest._id.toString(),
//     };
//   }

//   // ----------------------------------------------------
//   // Available
//   // ----------------------------------------------------
//   if (userBook.availability === "available") {
//     return {
//       status: "available" as const,
//     };
//   }

//   // ----------------------------------------------------
//   // Borrowed by someone else
//   // ----------------------------------------------------
//   return {
//     status: "unavailable" as const,
//   };
// }

export async function getBorrowStatus(
  userId: string,
  userBookId: string,
): Promise<BorrowStatusResponse> {
  const userBook = await getUserBookOrThrow(userBookId);
  const isOwner = userBook.owner.toString() === userId;

  // <<<<<<<<<<<<<<<<<<<< OWNER >>>>>>>>>>>>>>>>>>>> //

  if (isOwner) {
    const borrowRequest = await BorrowRequest.findOne({
      owner: userId,
      userBook: userBookId,
      status: "pending",
    });

    if (borrowRequest) {
      return {
        role: "owner",
        status: "borrow-request-received",
        actions: ["accept-borrow-request", "decline-borrow-request"],
        borrowRequestId: borrowRequest._id.toString(),
      };
    }

    const borrowRecord = await BorrowRecord.findOne({
      owner: userId,
      userBook: userBookId,
      status: "borrowed",
    });

    if (borrowRecord) {
      const returnRequest = await ReturnRequest.findOne({
        borrowRecord: borrowRecord._id,
        status: "pending",
      });

      if (returnRequest) {
        return {
          role: "owner",
          status: "return-request-received",
          actions: ["accept-return-request", "decline-return-request"],
          borrowRecordId: borrowRecord._id.toString(),
          returnRequestId: returnRequest._id.toString(),
        };
      }

      return {
        role: "owner",
        status: "lending",
        actions: ["ask-back"],
        borrowRecordId: borrowRecord._id.toString(),
      };
    }

    return {
      role: "owner",
      status: "owner",
      actions: [],
    };
  }

  // <<<<<<<<<<<<<<<<<<<< BORROWER >>>>>>>>>>>>>>>>>>>> //

  const borrowRecord = await BorrowRecord.findOne({
    borrower: userId,
    userBook: userBookId,
    status: "borrowed",
  });

  if (borrowRecord) {
    const returnRequest = await ReturnRequest.findOne({
      borrowRecord: borrowRecord._id,
      status: "pending",
    });

    if (returnRequest) {
      // I already requested to return
      if (returnRequest.borrower.toString() === userId) {
        return {
          role: "borrower",
          status: "return-request-sent",
          actions: ["cancel-return-request"],
          borrowRecordId: borrowRecord._id.toString(),
          returnRequestId: returnRequest._id.toString(),
        };
      }

      // Owner reminded me
      return {
        role: "borrower",
        status: "return-reminder-received",
        actions: ["return"],
        borrowRecordId: borrowRecord._id.toString(),
        returnRequestId: returnRequest._id.toString(),
      };
    }

    return {
      role: "borrower",
      status: "borrowing",
      actions: ["return"],
      borrowRecordId: borrowRecord._id.toString(),
    };
  }

  // <<<<<<<<<<<<<<<<<<<< VISITOR >>>>>>>>>>>>>>>>>>>> //

  const borrowRequest = await BorrowRequest.findOne({
    requester: userId,
    userBook: userBookId,
    status: "pending",
  });

  if (borrowRequest) {
    return {
      role: "visitor",
      status: "borrow-request-sent",
      actions: ["cancel-borrow-request"],
      borrowRequestId: borrowRequest._id.toString(),
    };
  }

  if (userBook.availability === "available") {
    return {
      role: "visitor",
      status: "available",
      actions: ["borrow"],
    };
  }

  return {
    role: "visitor",
    status: "unavailable",
    actions: [],
  };
}

export async function getBorrowRequestDetails(requestId: string) {
  const request = await BorrowRequest.findById(requestId)
    .populate("requester", "fullName username profileImage.url")
    .populate("owner", "fullName username profileImage.url")
    .populate({
      path: "userBook",
      populate: {
        path: "book",
        select: "title author coverImage",
      },
    });

  if (!request) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Borrow request not found.");
  }

  return request;
}

// HEPER FUNCTIONS

export async function getBorrowRequestOrThrow(requestId: string) {
  const borrowRequest = await BorrowRequest.findById(requestId);

  if (!borrowRequest) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Borrow request not found.");
  }

  return borrowRequest;
}

export function ensureBorrowRequester(
  borrowRequest: BorrowRequestSchemaType,
  userId: string,
): void {
  if (borrowRequest.requester.toString() !== userId) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, "You are not the requester.");
  }
}

export function ensureBorrowOwner(
  borrowRequest: BorrowRequestSchemaType,
  userId: string,
): void {
  if (borrowRequest.owner.toString() !== userId) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, "You are not the owner.");
  }
}

export function ensurePendingBorrowRequest(
  borrowRequest: BorrowRequestSchemaType,
): void {
  if (borrowRequest.status !== "pending")
    throw new ApiError(HTTP_STATUS.CONFLICT, "This is not Pending Request");
}

export function ensureNotPendingBorrowRequest(
  borrowRequest: BorrowRequestSchemaType,
): void {
  if (borrowRequest.status === "pending")
    throw new ApiError(HTTP_STATUS.CONFLICT, "This is Pending Request");
}

export async function cancelPendingBorrowRequests(
  userBookId: string,
  acceptedRequestId: string,
): Promise<void> {
  const pendingRequests = await BorrowRequest.find({
    userBook: userBookId,
    status: "pending",
    _id: { $ne: acceptedRequestId },
  });

  await BorrowRequest.updateMany(
    {
      userBook: userBookId,
      status: "pending",
      _id: { $ne: acceptedRequestId },
    },
    {
      $set: {
        status: "cancelled",
      },
    },
  );

  await Promise.all(
    pendingRequests.map((request) =>
      createNotification({
        from: request.owner._id.toString(),
        to: request.requester._id.toString(),
        event: NotificationEvents.BORROW_REQUEST_CANCELLED,
        userBook: userBookId,
        message:
          "Your borrow request was cancelled because another request for this book was accepted.",
      }),
    ),
  );
}

export async function updateBorrowRequestStatus(
  requestId: string,
  status: BorrowRequestStatus,
) {
  logger.debug("Updated borrow request", {
    requestId,
    status,
  });

  const result = await BorrowRequest.findByIdAndUpdate(
    requestId,
    { status },
    { new: true },
  );

  logger.debug("Updated borrow request", { result });

  return result;
}

export async function ensureNoDuplicateBorrowRequest(
  requesterId: string,
  userBookId: string,
) {
  const exists = await BorrowRequest.exists({
    requester: requesterId,
    userBook: userBookId,
    status: "pending",
  });

  if (exists) {
    throw new ApiError(HTTP_STATUS.CONFLICT, "Borrow request already exists.");
  }
}
