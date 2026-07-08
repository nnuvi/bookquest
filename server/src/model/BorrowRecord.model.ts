import mongoose, { InferSchemaType, model } from "mongoose";

const { Schema } = mongoose;

export const BorrowRecordStatusEnum = [
  "borrowed",
  "return_requested",
  "returned",
  "overdue",
] as const;

export type BorrowRecordStatus = (typeof BorrowRecordStatusEnum)[number];

const BorrowRecordSchema = new Schema(
  {
    borrowRequest: {
      type: Schema.Types.ObjectId,
      ref: "BorrowRequest",
      required: true,
      unique: true,
      index: true,
    },

    borrower: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    userBook: {
      type: Schema.Types.ObjectId,
      ref: "UserBook",
      required: true,
      index: true,
    },

    borrowAt: {
      type: Date,
      default: Date.now,
    },

    dueAt: {
      type: Date,
      required: true,
    },

    returnRequest: {
      status: {
        enum: ["none", "pending", "declined", "expired"],
      },

      requestedAt: Date,
    },

    returnAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: BorrowRecordStatusEnum,
      default: "borrowed",
      index: true,
    },

    lastReminderAt: {
      type: Date,
    }
  },
  {
    timestamps: true,
  },
);

BorrowRecordSchema.index(
  { userBook: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: "borrowed",
    },
  },
);

export type BorrowRecordSchemaType = InferSchemaType<typeof BorrowRecordSchema>;

const BorrowRecord = model<BorrowRecordSchemaType>(
  "BorrowRecord",
  BorrowRecordSchema,
);

export default BorrowRecord;
