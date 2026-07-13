// import { BorrowRecord } from "./borrow";
import { UserBook } from "./book";
import { User } from "./user";

export type BorrowRecordStatus = "borrowed" | "returned" | "overdue";

export type BorrowRecord = {
  _id: string;
  borrowRequest: string;

  borrower: User;
  owner: User;

  userBook: UserBook;

  borrowAt: Date;
  dueAt: Date;
  returnAt?: Date | null;

  status: BorrowRecordStatus;
};


export const ReturnRequestStatusEnum = [
  "pending",
  "accepted",
  "declined",
  "cancelled",
  "expired",
] as const;

export type ReturnRequestStatus = (typeof ReturnRequestStatusEnum)[number];

export type ReturnRequest = {
  _id: string;

  borrowRecord: BorrowRecord;

  borrower: User;
  owner: User;

  status: ReturnRequestStatus;

  message: string;
  responseMessage: string;

  expiresAt: string | null;

  createdAt: string;
  updatedAt: string;
};