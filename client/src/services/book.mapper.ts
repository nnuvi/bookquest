import { Book, BookCardItem, UserBook } from "@/types/book";
import { BorrowRecord, BorrowRequest } from "@/types/borrow";

export function mapBook(book: Book): BookCardItem {
  return {
    id: book._id,
    bookId: book._id,
    title: book.title,
    author: book.author,
    coverImage: book.coverImage,
    type: "book",
  };
}

export function mapUserBook(book: UserBook): BookCardItem {
  return {
    id: book._id,
    userBookId: book._id,
    title: book.book.title,
    author: book.book.author,
    coverImage: book.book.coverImage,
    addedAt: book.addedAt,
    availability: book.availability,
    type: "userBook",
  };
}

export function mapBorrowRecord(
  record: BorrowRecord,
  type: "borrowed" | "lent",
): BookCardItem {
  return {
    id: record._id,
    userBookId: record.userBook._id,
    title: record.userBook.book.title,
    author: record.userBook.book.author,
    coverImage: record.userBook.book.coverImage,
    // userBook: record.userBook,
    // owner: record.owner,
    // borrower: record.borrower,
    borrowDate: record.borrowDate,
    // status: record.status,
    type,
  };
}

export function mapBorrowRequestBook(
  request: BorrowRequest,
): BookCardItem {
  return {
    id: request._id,

    // borrowRequestId: request._id,

    userBookId: request.userBook._id,

    title: request.userBook.book.title,
    author: request.userBook.book.author,
    coverImage: request.userBook.book.coverImage,

    borrowRequestStatus: request.status,

    requester: {
      id: request.requester._id,
      fullName: request.requester.fullName,
      username: request.requester.username,
      profileImage: request.requester.profileImage,
    },

    owner: {
      id: request.owner._id,
      fullName: request.owner.fullName,
      username: request.owner.username,
      profileImage: request.owner.profileImage,
    }, 
  };
}
