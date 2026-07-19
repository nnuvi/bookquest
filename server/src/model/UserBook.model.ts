import mongoose, { InferSchemaType, model } from "mongoose";

const { Schema } = mongoose;

export const UserBookAvailabilityEnum = [
  "available",
  "borrowed",
  "lent",
  "unavailable",
];

export type UserBookAvailability = (typeof UserBookAvailabilityEnum)[number];

const BookConditionEnum = ["new", "good", "fair", "poor"] as const;

export type BookCondition = (typeof BookConditionEnum)[number];

const UserBookSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
      index: true,
    },

    condition: {
      type: String,
      enum: BookConditionEnum,
    },

    availability: {
      type: String,
      enum: UserBookAvailabilityEnum,
      default: "available",
    },

    inputSource: {
      method: {
        type: String,
        enum: ["manual", "isbn", "barcode", "ocr", "ai"],
        default: "manual",
      },

      rawInput: {
        type: String,
        default: "",
      },

      confidence: {
        type: Number,
        default: 1,
      },
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export type UserBookSchemaType = InferSchemaType<typeof UserBookSchema>;

const UserBook = model<UserBookSchemaType>("UserBook", UserBookSchema);

export default UserBook;
