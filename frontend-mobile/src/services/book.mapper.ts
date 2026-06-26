import { BookCardItem, UserBook } from "@/types/book";
import { BorrowRecord } from "@/types/borrow";

export function mapUserBook(book: UserBook): BookCardItem {
  return {
    _id: book._id,
    userBook: book,
    owner: book.owner,
    addedAt: book.addedAt,
    availability: book.availability,
    type: "userBook",
  };
}

export function mapBorrowRecord(
  record: BorrowRecord,
  type: "borrowed" | "lent"
): BookCardItem {
  return {
    _id: record._id,
    userBook: record.userBook,
    owner: record.owner,
    borrower: record.borrower,
    borrowDate: record.borrowDate,
    status: record.status,
    type,
  };
}