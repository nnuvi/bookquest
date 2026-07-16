import { BorrowRequestStatus } from "./borrow";
import { BorrowRecordStatus, ReturnRequestStatus } from "./return";
import { User } from "./user";

// API TYPES
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
  language: string;
  publishDate?: string;

  rating: {
    average: number;
    count: number;
  };

  bookType?: Date;
  bookAdded?: string;
};

export type availability = "available" | "borrowed" | "lent" | "unavailable";
export type BookCondition = "new" | "good" | "fair" | "poor";

export type UserBook = {
  _id: string;

  owner: User;
  borrower?: User;

  book: Book;

  condition: BookCondition;
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

// UI TYPE
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
  borrowAt?: Date;
  dueAt?: Date;
  returnAt?: Date;

  borrowStatus?: BorrowRecordStatus;

  borrowRequestId?: string;
  borrowRequestStatus?: BorrowRequestStatus;
  returnRequestId?: string;

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

  borrowRecordId?: string;

  returnRequestStatus?: ReturnRequestStatus;

  borrower?: {
    id: string;
    fullName: string;
    username: string;
    profileImage?: string;
  };
};
