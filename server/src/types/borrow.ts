// import
// export type BorrowStatus =
//   | "borrowed"
//   | "returned"
//   | "overdue";

// export type BorrowRecord = {
//   _id: string;
//   borrowRequest: string;

//   borrower: User;
//   owner: User;

//   userBook: UserBook;

//   borrowDate: string;
//   dueDate: string;
//   returnDate: string | null;

//   status: BorrowStatus;

//   createdAt: string;
//   updatedAt: string;

//   __v: number;
// };

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
