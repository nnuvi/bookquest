import { UserBook } from "./book";
import { User } from "./user";

export type BorrowStatus = "borrowed" | "returned" | "overdue";

export type BorrowRecord = {
  _id: string;
  borrowRequest: string;

  borrower: User;
  owner: User;

  userBook: UserBook;

  borrowDate: Date;
  dueDate: Date;
  returnDate: Date | null;

  status: BorrowStatus;
};

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

  expiresAt?: string;

  createdAt: string;
  updatedAt: string;
}
