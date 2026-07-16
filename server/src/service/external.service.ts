import env from "@/config/env.js";
import logger from "@/config/logger.js";
import { HTTP_STATUS } from "@/constant/httpStatus.js";
import ApiError from "@/lib/apiError.js";
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

  logger.debug("Google Books API RES: ", {data})

  return data;
}
