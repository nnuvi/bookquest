import { BookSchemaType } from "@/model/Book.model.js";

export type CreateBookData = Omit<
  BookSchemaType,
  "rating" | "createdAt" | "updatedAt"
>;

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

// export interface BookType {
//   _id: string;
//   title: string;
//   author: string[];
//   genre: string[];
//   bookType: string;
// }
