import logger from "../config/logger.js";
import { HTTP_STATUS } from "../constant/httpStatus.js";
import ApiError from "../lib/apiError.js";
import { BorrowRecordSchemaType } from "../model/BorrowRecord.model.js";
import { NotificationEvents } from "../model/Notification.model.js";
import ReturnRequest, {
  ReturnRequestSchemaType,
  ReturnRequestStatus,
} from "../model/ReturnRequest.model.js";
import { updateBookAvailability } from "./book.service.js";
import { createNotification } from "./notification.service.js";
import {
  completeBorrowRecord,
  ensureBorrowRecordOwner,
  ensureBorrowRecordStatus,
  getBorrowRecordOrThrow,
  getPopulatedBorrowRecordOrThrow,
} from "./record.service.js";

export async function sendReturnRequest(
  borrowerId: string,
  borrowRecordId: string,
  message = "",
) {
  const borrowRecord = await getBorrowRecordOrThrow(borrowRecordId);

  logger.debug(
    `Send return req service: ${borrowerId} : ${borrowRecordId} : ${message}`,
    {
      borrowerId,
      borrowRecordId,
      message,
    },
  );

  ensureBorrower(borrowRecord, borrowerId);

  ensureBorrowRecordStatus(borrowRecord, "borrowed");

  await ensureNoDuplicateReturnRequest(borrowRecordId);

  const returnRequest = await createReturnRequest(
    borrowerId,
    borrowRecord.owner.toString(),
    borrowRecordId,
    message,
  );

  await createNotification({
    from: borrowerId,
    to: borrowRecord.owner.toString(),
    userBook: borrowRecord.userBook.toString(),
    event: NotificationEvents.RETURN_REQUEST_SENT,
    message: "sent a return request.",
  });

  return {
    success: true,
    data: returnRequest,
  };
}

export async function getReturnRequests(ownerId: string) {
  const requests = await ReturnRequest.find({
    owner: ownerId,
    status: "pending",
  })
    .populate("borrower", "fullName username profileImage")
    .populate({
      path: "borrowRecord",
      populate: {
        path: "userBook",
        populate: {
          path: "book",
          select: "title author coverImage",
        },
      },
    })
    .sort({ createdAt: -1 });

  return {
    success: true,
    data: requests,
  };
}

export async function getReturnSentRequests(borrowerId: string) {
  const requests = await ReturnRequest.find({
    borrower: borrowerId,
    status: "pending",
  })
    .populate("owner", "fullName username profileImage")
    .populate({
      path: "borrowRecord",
      populate: {
        path: "userBook",
        populate: {
          path: "book",
          select: "title author coverImage",
        },
      },
    })
    .sort({ createdAt: -1 });

  return {
    success: true,
    data: requests,
  };
}

export async function respondReturnRequest(
  requestId: string,
  ownerId: string,
  action: ReturnRequestStatus,
) {
  const request = await getReturnRequestOrThrow(requestId);

  ensureReturnOwner(request, ownerId);
  ensurePendingReturnRequest(request);

  await updateReturnRequestStatus(requestId, action);

  const borrowerId = request.borrower.toString();
  const borrowRecordId = request.borrowRecord.toString();

  const borrowRecord = await getBorrowRecordOrThrow(borrowRecordId);

  if (action === "accepted") {
    await completeBorrowRecord(borrowRecordId);

    await updateBookAvailability(borrowRecord.userBook.toString(), "available");

    await createNotification({
      from: ownerId,
      to: borrowerId,
      userBook: borrowRecord.userBook.toString(),
      event: NotificationEvents.RETURN_REQUEST_APPROVED,
      message: "accepted your return request.",
    });
  } else if (action === "declined") {
    await createNotification({
      from: ownerId,
      to: borrowerId,
      userBook: borrowRecord.userBook.toString(),
      event: NotificationEvents.RETURN_REQUEST_DECLINED,
      message: "declined your return request.",
    });
  }

  return request;
}

export async function cancelReturnRequest(
  requestId: string,
  borrowerId: string,
) {
  const request = await getReturnRequestOrThrow(requestId);

  ensureReturnRequester(request, borrowerId);
  ensurePendingReturnRequest(request);

  await updateReturnRequestStatus(requestId, "cancelled");

  return request;
}

export async function sendReturnReminder(
  ownerId: string,
  borrowRecordId: string,
) {
  const borrowRecord = await getBorrowRecordOrThrow(borrowRecordId);

  ensureBorrowRecordOwner(borrowRecord, ownerId);

  ensureBorrowRecordStatus(borrowRecord, "borrowed");

  if (
    borrowRecord.lastReminderAt &&
    Date.now() - borrowRecord.lastReminderAt.getTime() < 24 * 60 * 60 * 1000
  ) {
    throw new ApiError(
      HTTP_STATUS.TOO_MANY_REQUESTS,
      "A reminder was already sent within the last 24 hours.",
    );
  }

  await createNotification({
    from: ownerId,
    to: borrowRecord.borrower.toString(),
    userBook: borrowRecord.userBook.toString(),
    event: NotificationEvents.RETURN_REMINDER_SENT,
    message: "reminded you to return the book.",
  });

  borrowRecord.lastReminderAt = new Date();
  await borrowRecord.save();

  return {
    success: true,
  };
}

export async function sendAskBackReminder(recordId: string, ownerId: string) {
  const record = await getPopulatedBorrowRecordOrThrow(recordId);

  ensureBorrowRecordOwner(record, ownerId);

  ensureBorrowRecordStatus(record, "borrowed");

  await createNotification({
    from: record.owner.toString(),
    to: record.borrower.toString(),
    userBook: record.userBook.toString(),
    event: NotificationEvents.RETURN_REMINDER_SENT,
    message: "sent a reminder to ask back the book",
  });
}

export async function getReturnRequestOrThrow(requestId: string) {
  const returnRequest = await ReturnRequest.findById(requestId);

  if (!returnRequest) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Return request not found.");
  }

  return returnRequest;
}

export function ensureReturnRequester(
  returnRequest: ReturnRequestSchemaType,
  userId: string,
): void {
  if (returnRequest.borrower.toString() !== userId) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, "You are not the requester.");
  }
}

export function ensureReturnOwner(
  returnRequest: ReturnRequestSchemaType,
  userId: string,
): void {
  if (returnRequest.owner.toString() !== userId) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, "You are not the owner.");
  }
}

export function ensurePendingReturnRequest(
  returnRequest: ReturnRequestSchemaType,
): void {
  if (returnRequest.status !== "pending") {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      "This return request is no longer pending.",
    );
  }
}

export async function updateReturnRequestStatus(
  requestId: string,
  status: ReturnRequestStatus,
): Promise<void> {
  await ReturnRequest.updateOne(
    { _id: requestId },
    {
      $set: {
        status,
      },
    },
  );
}

export async function createReturnRequest(
  borrower: string,
  owner: string,
  borrowRecord: string,
  message = "",
) {
  return ReturnRequest.create({
    borrower,
    owner,
    borrowRecord,
    message,
  });
}

export async function ensureNoDuplicateReturnRequest(
  borrowRecordId: string,
): Promise<void> {
  const exists = await ReturnRequest.exists({
    borrowRecord: borrowRecordId,
    status: "pending",
  });

  if (exists) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      "A return request already exists.",
    );
  }
}

export function ensureBorrower(
  borrowRecord: BorrowRecordSchemaType,
  borrowerId: string,
): void {
  if (borrowRecord.borrower.toString() !== borrowerId) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, "You are not the borrower.");
  }
}
