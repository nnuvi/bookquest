import env from "@/config/env.js";
import logger from "@/config/logger.js";
import { HTTP_STATUS } from "@/constant/httpStatus.js";
import ApiError from "@/lib/ApiError.js";
import { GoogleBook } from "@/types/book.js";
// import ApiError from "@/utils/ApiError";

export async function getGoogleBookByISBN(isbn: string) {
  const url = new URL("https://www.googleapis.com/books/v1/volumes");

  url.searchParams.set("q", `isbn:${isbn}`);
  url.searchParams.set("key", env.GOOGLE_BOOKS_API_KEY);

  let response: Response;

  try {
    response = await fetch(url);
  } catch {
    throw new ApiError(
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      "Unable to connect to Google Books.",
    );
  }

  if (!response.ok) {
    throw new ApiError(
      HTTP_STATUS.BAD_GATEWAY,
      "Google Books returned an error.",
    );
  }

  const data = await response.json();

  logger.debug("Google Books API RES: ", { data });

  return data;
}

function normalizeISBN(isbn: string) {
  return isbn.replace(/[-\s]/g, "");
}

function scoreBook(item: GoogleBook, isbn: string) {
  const info = item.volumeInfo;
  const target = normalizeISBN(isbn);

  let score = 0;

  for (const id of info.industryIdentifiers ?? []) {
    if (normalizeISBN(id.identifier) === target) {
      score += id.type === "ISBN_13" ? 100 : 90;
    }
  }

  if (info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail) {
    score += 20;
  }

  if (info.authors?.length) score += 10;
  if (info.pageCount) score += 5;
  if (info.publisher) score += 5;
  if (info.description) score += 5;

  return score;
}

export function selectBestGoogleBook(
  items: GoogleBook[],
  isbn: string,
): GoogleBook {
  if (items.length === 0) {
    throw new Error("No Google Books found.");
  }

  return [...items].sort((a, b) => scoreBook(b, isbn) - scoreBook(a, isbn))[0]!;
}

export function getGoogleBookCover(imageLinks?: {
  extraLarge?: string;
  large?: string;
  medium?: string;
  small?: string;
  thumbnail?: string;
  smallThumbnail?: string;
}) {
  const url =
    imageLinks?.extraLarge ??
    imageLinks?.large ??
    imageLinks?.medium ??
    imageLinks?.small ??
    imageLinks?.thumbnail ??
    imageLinks?.smallThumbnail;

  return url?.replace(/^http:\/\//, "https://") ?? "";
}
