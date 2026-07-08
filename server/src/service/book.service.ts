import { HTTP_STATUS } from "../constant/httpStatus.js";
import ApiError from "../lib/apiError.js";
import UserBook, {
  UserBookSchemaType,
  UserBookAvailability,
} from "../model/UserBook.model.js";

// userbook exists
// ensure book availablity (case)
// ensure book availablity not (case)
// ensure book owner
// ensure not bookowner
// update book avalibilty

export async function getUserBookOrThrow(userBookId: string) {
  const userBook = await UserBook.findById(userBookId);
  if (!userBook) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, "Book not found.");
  }
  return userBook;
}

export function ensureBookAvailability(
  userBook: UserBookSchemaType,
  availability: UserBookAvailability,
): void {
  if (userBook.availability !== availability) {
    throw new ApiError(HTTP_STATUS.CONFLICT, `Book must be ${availability}.`);
  }
}

export function ensureBookNotAvailability(
  userBook: UserBookSchemaType,
  availability: UserBookAvailability,
) {
  if (userBook.availability === availability) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      `Book must not be ${availability}.`,
    );
  }
}

export function ensureBookOwner(
  userBook: UserBookSchemaType,
  userId: string,
): void {
  if (userBook.owner.toString() !== userId) {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      "You are not the owner of this book.",
    );
  }
}

export function ensureNotBookOwner(
  userBook: UserBookSchemaType,
  userId: string,
): void {
  if (userBook.owner.toString() === userId) {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      "You are the owner of this book.",
    );
  }
}

export async function updateBookAvailability(
  userBookId: string,
  availability: UserBookAvailability,
): Promise<void> {
  const userBook = await getUserBookOrThrow(userBookId);
  userBook.availability = availability;
  await userBook.save();
}
