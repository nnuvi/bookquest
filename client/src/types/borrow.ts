import { UserBook } from "./book";
import { User } from "./user";

export const BorrowRequestStatus = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  DECLINED: "declined",
  CANCELLED: "cancelled",
  EXPIRED: "expired",
} as const;

export type BorrowRequestStatus =
  (typeof BorrowRequestStatus)[keyof typeof BorrowRequestStatus];

export interface BorrowRequest {
  _id: string;

  requester: User;
  owner: User;
  userBook: UserBook;

  status: BorrowRequestStatus;

  message: string;

  borrowDurationDays: number;

  expiresAt?: string;

  createdAt: string;
  updatedAt: string;
}
// export const BorrowStatusEnum = [
//   "owner",
//   "incoming-request",
//   "borrowed",
//   "request-pending",
//   "available",
//   "unavailable",
// ] as const;

export const BorrowRoleEnum = ["owner", "borrower", "visitor"] as const;

export type BorrowRole = (typeof BorrowRoleEnum)[number];

export const BorrowStatusEnum = [
  "owner",
  "available",
  "unavailable",

  "borrow-request-sent",
  "borrow-request-received",

  "borrowing",
  "lending",

  "return-request-sent",
  "return-request-received",

  "return-reminder-sent",
  "return-reminder-received",

  "overdue",
] as const;

export type BorrowStatus = (typeof BorrowStatusEnum)[number];

export const BorrowActionEnum = [
  "borrow",

  "cancel-borrow-request",

  "accept-borrow-request",
  "decline-borrow-request",

  "return",

  "cancel-return-request",

  "accept-return-request",
  "decline-return-request",

  "cancel-return-request",

  "ask-back",

  "none",
] as const;

export type BorrowAction = (typeof BorrowActionEnum)[number];

// export interface BorrowStatusResponse {
//   role: BorrowRole;
//   status: BorrowStatus;

//   actions: BorrowAction[];

//   requestId?: string;
//   borrowRecordId?: string;
// }

export type BorrowStatusResponse = {
  role: "owner" | "borrower" | "visitor";

  status: BorrowStatus;

  actions: BorrowAction[];

  borrowRecordId?: string;

  borrowRequestId?: string;
  returnRequestId?: string;
};
