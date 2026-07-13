import { BorrowRequestSchemaType } from "../model/BorrowRequest.model.js";
import { UserSchemaType } from "../model/user.model.js";
import { UserBookSchemaType } from "../model/UserBook.model.js";
import { BookSchemaType } from "../model/Book.model.js";

export type PopulatedBorrowRequest = Omit<
  BorrowRequestSchemaType,
  "requester" | "owner" | "userBook"
> & {
  requester: UserSchemaType;
  owner: UserSchemaType;
  userBook: UserBookSchemaType & {
    book: BookSchemaType;
  };
};