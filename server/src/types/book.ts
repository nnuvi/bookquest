import { BookSchemaType } from "@/model/Book.model.js";

export interface GoogleBooksResponse {
  kind: string;
  totalItems: number;
  items?: GoogleBook[];
}

export interface GoogleBook {
  id: string;
  etag: string;
  selfLink: string;

  volumeInfo: GoogleBookVolumeInfo;
}

export interface GoogleBookVolumeInfo {
  title?: string;
  subtitle?: string;

  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;

  industryIdentifiers?: GoogleIndustryIdentifier[];

  pageCount?: number;

  categories?: string[];

  language?: string;

  imageLinks?: GoogleImageLinks;
}

export interface GoogleIndustryIdentifier {
  type: "ISBN_10" | "ISBN_13" | string;
  identifier: string;
}

export interface GoogleImageLinks {
  smallThumbnail?: string;
  thumbnail?: string;
  small?: string;
  medium?: string;
  large?: string;
  extraLarge?: string;
}

export type CreateBookDto = {
  title: string;
  author: string[];
  genres: string[];
  pageCount: number;
  isbn: string;
  publisher: string;
  publishDate?: Date;
  description: string;
  language: string;
  coverImage: string;
};

export function mapGoogleBook(book: GoogleBook, isbn: string): CreateBookDto {
  const info = book.volumeInfo;

  const extractedISBN =
    info.industryIdentifiers?.find(({ type }) => type === "ISBN_13")
      ?.identifier ??
    info.industryIdentifiers?.find(({ type }) => type === "ISBN_10")
      ?.identifier;

  const dto: CreateBookDto = {
    title: info.title ?? "",
    author: info.authors ?? [],
    genres: info.categories ?? [],
    pageCount: info.pageCount ?? 0,
    isbn: extractedISBN ?? isbn,
    publisher: info.publisher ?? "",
    description: info.description ?? "",
    coverImage:
      info.imageLinks?.large ??
      info.imageLinks?.medium ??
      info.imageLinks?.thumbnail ??
      "",
    language: info.language ?? "",
  };

  const publishDate = parsePublishedDate(info.publishedDate);

  if (publishDate) {
    dto.publishDate = publishDate;
  }

  return dto;
}

function parsePublishedDate(date?: string): Date | undefined {
  if (!date) return undefined;

  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export const UserBookConditionEnum = ["new", "good", "fair", "poor"] as const;

export type UserBookCondition = (typeof UserBookConditionEnum)[number];

export const InputMethodEnum = [
  "manual",
  "isbn",
  "barcode",
  "ocr",
  "ai",
] as const;

export type InputMethod = (typeof InputMethodEnum)[number];

export type CreateUserBookDto = {
  condition?: UserBookCondition;

  notes?: string;

  inputSource?: {
    method?: InputMethod;
    rawInput?: string;
    confidence?: number;
  };
};

export interface BookType {
  _id: string;
  title: string;
  author: string[];
  genre: string[];
  bookType: string;
}
