import { BorrowRequestStatus } from "./borrow";
import { User } from "./user";

export type Book = {
  _id: string;
  title: string;
  author: string[];
  isbn: string;
  publisher: string;
  genres: string[];
  pageCount: number;
  coverImage: string;
  description: string;

  rating: {
    average: number;
    count: number;
  };

  bookType?: Date;
  bookAdded?: string;
};

export type availability = "available" | "borrowed" | "lent" | "unavailable";
export type condition = "new" | "good" | "fair" | "poor";

export type UserBook = {
  _id: string;

  owner: User;
  borrower?: User;

  book: Book;

  condition: condition;
  availability: availability;
  notes: string;

  addedAt: Date;

  inputSource: {
    method: string;
    rawInput: string;
    confidence: number;
  };
};

export type bookType = "userBook" | "borrowed" | "lent" | "book";

export type BookCardItem = {
  id: string;
  bookId?: string;
  userBookId?: string;

  title: string;
  author: string[];
  coverImage: string;

  type?: bookType;

  availability?: availability;

  addedAt?: Date;
  borrowDate?: Date;

  borrowRequestId?: string;
  borrowRequestStatus?: BorrowRequestStatus;

  requester?: {
    id: string;
    fullName: string;
    username: string;
    profileImage?: string;
  };

  owner?: {
    id: string;
    fullName: string;
    username: string;
    profileImage?: string;
  };
};
// export type BookCardItem = {
//   _id: string;
//   bookId?: string;
//   userBookId?: string;
//   title: string;
//   author: string[];
//   coverImage: string;
//   userBook?: UserBook;
//   owner?: User;
//   borrower?: User;
//   addedAt?: Date;
//   borrowDate?: Date;
//   availability?: availability;
//   status?: "borrowed" | "returned" | "overdue";
//   type?: bookType;
// };
