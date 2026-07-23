import logger from "../config/logger.js";
import { HTTP_STATUS } from "../constant/httpStatus.js";
import ApiError from "../lib/ApiError.js";
import BorrowRecord, {
  BorrowRecordSchemaType,
} from "../model/BorrowRecord.model.js";
import { BorrowRequestSchemaType } from "../model/BorrowRequest.model.js";

export async function getBorrowRecordOrThrow(borrowRecordId: string) {
  const borrowRecord = await BorrowRecord.findById(borrowRecordId);

  if (!borrowRecord) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Borrow record not found.");
  }

  return borrowRecord;
}

export async function getPopulatedBorrowRecordOrThrow(recordId: string) {
  const record = await BorrowRecord.findById(recordId)
    .populate("borrower", "fullName username profileImage.url")
    .populate("owner", "fullName username profileImage.url")
    .populate({
      path: "userBook",
      populate: {
        path: "book",
        select: "title author coverImage",
      },
    });

  if (!record) {
    throw new ApiError(404, "Borrow record not found.");
  }

  return record;
}

export async function createBorrowRecord(
  borrowRequest: BorrowRequestSchemaType,
) {
  const borrowAt = new Date();

  const DAY = 24 * 60 * 60 * 1000;

  const dueAt = new Date(
    borrowAt.getTime() + borrowRequest.borrowDurationDays * DAY,
  );

  logger.debug("Creating borrow record", {
    duration: borrowRequest.borrowDurationDays,
    type: typeof borrowRequest.borrowDurationDays,
  });

  logger.debug("Borrow request before createBorrowRecord", borrowRequest);

  logger.debug("Borrow request before createBorrowRequest", {
    borrowDurationDays: borrowRequest.borrowDurationDays,
    message: borrowRequest.message,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  });

  logger.debug("Borrow record before createBorrowRecord", {
    borrowRequest: borrowRequest,
    borrower: borrowRequest.requester,
    owner: borrowRequest.owner,
    userBook: borrowRequest.userBook,
    borrowAt,
    dueAt,
  });

  return BorrowRecord.create({
    borrowRequest: borrowRequest,
    borrower: borrowRequest.requester,
    owner: borrowRequest.owner,
    userBook: borrowRequest.userBook,
    borrowAt,
    dueAt,
  });
}

export async function getBorrowedBooks(userId: string) {
  return BorrowRecord.find({
    borrower: userId,
    status: "borrowed",
  })
    .populate("borrower", "fullName username profileImage.url")
    .populate("owner", "fullName username profileImage.url")
    .populate({
      path: "userBook",
      populate: {
        path: "book",
        select: "title author coverImage",
      },
    })
    .sort({ borrowAt: -1 });
}

export async function getLentBooks(userId: string) {
  return BorrowRecord.find({
    owner: userId,
    status: "borrowed",
  })
    .populate("borrower", "fullName username profileImage.url")
    .populate("owner", "fullName username profileImage.url")
    .populate({
      path: "userBook",
      populate: {
        path: "book",
        select: "title author coverImage",
      },
    })
    .sort({ borrowAt: -1 });
}

export function ensureBorrowRecordOwner(
  borrowRecord: BorrowRecordSchemaType,
  ownerId: string,
): void {
  if (borrowRecord.owner.toString() !== ownerId) {
    throw new ApiError(HTTP_STATUS.FORBIDDEN, "You are not the owner.");
  }
}

export function ensureBorrowRecordStatus(
  borrowRecord: BorrowRecordSchemaType,
  status: "borrowed" | "returned",
): void {
  if (borrowRecord.status !== status) {
    throw new ApiError(HTTP_STATUS.CONFLICT, `Book is not ${status}.`);
  }
}

export async function completeBorrowRecord(
  borrowRecordId: string,
): Promise<void> {
  await BorrowRecord.updateOne(
    { _id: borrowRecordId },
    {
      $set: {
        status: "returned",
        returnedAt: new Date(),
      },
    },
  );
}
