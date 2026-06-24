export type Book = {
  _id: String;
  title: string;
  author: string[];
  isbn: number;
  publisher: string;
  genres: string[];
  pageCount: number;
  coverImage: string;
  description: string;
  rating: {
    average: Number;
    count: Number;
  };
};

export type UserBook = {
  _id: String;
  owner: string;
  book: Book;
  condition: String;
  availability: String;
  notes: String;
  addedAt: Date;
  inputSource: {
    method: String;
    rawInput: String;
    confidence: Number;
  };
};
