import { UserBook } from "./book";
import { User } from "./user";

export type BorrowStatus =
  | "borrowed"
  | "returned"
  | "overdue";

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