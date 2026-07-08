import ApiError from "../lib/apiError.js";
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

// sendBorrowRequest /
// getBorrowRequests /
// getSentBorrowRequests /
// respondToBorrowRequest /
// cancelBorrowRequest /
// getBorrowStatus /

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

  logger.debug("getBorrowRequests: ", borrowRequests);

  return {
    success: true,
    data: borrowRequests,
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

  logger.debug("getBorrowSentRequests: ", borrowSentRequests);

  return {
    success: true,
    data: borrowSentRequests,
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
  ensureNoDuplicateBorrowRequest(requesterId, userBookId);

  // const pendingRequest = await getPendingBorrowRequest(requesterId, userBookId);

  // ensureNotPendingBorrowRequest(pendingRequest!);

  return createBorrowRequest(
    requesterId,
    userBook.owner.toString(),
    userBookId,
    borrowDurationDays,
    message,
  );
}

export async function respondBorrowRequest(
  requestId: string,
  ownerId: string,
  action: BorrowRequestStatus,
) {
  const request = await getBorrowRequestOrThrow(requestId);
  const requesterId = request.requester._id.toString();
  const userBookId = request.userBook._id.toString();

  ensurePendingBorrowRequest(request);

  await updateBorrowRequestStatus(requestId, action);

  if (action === "accepted") {
    await createBorrowRecord(request);
    await createNotification({
      from: ownerId,
      to: requestId,
      userBook: userBookId,
      event: NotificationEvents.BORROW_REQUEST_APPROVED,
      message: `acceped your Borrow Request`,
    });
    await cancelPendingBorrowRequests(userBookId, requestId);
    await updateBookAvailability(userBookId, "borrowed");
  } else if (action === "declined") {
    await updateBorrowRequestStatus(requestId, "declined");
    await createNotification({
      from: ownerId,
      to: requestId,
      userBook: userBookId,
      event: NotificationEvents.BORROW_REQUEST_DECLINED,
      message: `declined your Borrow Request`,
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
  const borrowRequest = await BorrowRequest.create({
    requester: requesterId,
    owner: ownerId,
    userBook: userBookId,
    borrowDurationDays,
    message,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  });

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

export async function getBorrowStatus(userId: string, userBookId: string) {
  const userBook = await getUserBookOrThrow(userBookId);

  // Owner of the book
  if (userBook.owner.toString() === userId) {
    return {
      status: "owner",
    };
  }

  // Active borrow record (user currently borrowing this book)
  const borrowRecord = await BorrowRecord.findOne({
    borrower: userId,
    userBook: userBookId,
    status: "borrowed",
  });

  if (borrowRecord) {
    return {
      status: "borrowed",
      borrowRecordId: borrowRecord._id,
    };
  }

  // Pending borrow request
  const borrowRequest = await BorrowRequest.findOne({
    requester: userId,
    userBook: userBookId,
    status: "pending",
  });

  if (borrowRequest) {
    return {
      status: "pending",
      requestId: borrowRequest._id,
    };
  }

  // Book available to request
  if (userBook.availability === "available") {
    return {
      status: "available",
    };
  }

  // Book currently lent to someone else
  return {
    status: "unavailable",
  };
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
): Promise<void> {
  await BorrowRequest.updateOne({ _id: requestId }, { status });
}

export async function createBorrowRecord(
  borrowRequest: BorrowRequestSchemaType,
) {
  const borrowAt = new Date();

  const DAY = 24 * 60 * 60 * 1000;

  const dueAt = new Date(
    borrowAt.getTime() + borrowRequest.borrowDurationDays * DAY,
  );

  return BorrowRecord.create({
    borrowRequest: borrowRequest,
    borrower: borrowRequest.requester,
    owner: borrowRequest.owner,
    userBook: borrowRequest.userBook,
    borrowAt,
    dueAt,
  });
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
