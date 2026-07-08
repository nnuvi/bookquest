import mongoose, { InferSchemaType, model } from "mongoose";

const { Schema } = mongoose;

export const RecallRequestStatusEnum = [
  "pending",
  "accepted",
  "declined",
  "cancelled",
  "ignored",
] as const;

export type RecallRequestStatus =
  (typeof RecallRequestStatusEnum)[number];

const RecallRequestSchema = new Schema(
  {
    borrowRecord: {
      type: Schema.Types.ObjectId,
      ref: "BorrowRecord",
      required: true,
      unique: true,
      index: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    borrower: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    message: {
      type: String,
      default: "",
      trim: true,
      maxlength: 300,
    },

    responseMessage: {
      type: String,
      default: "",
      trim: true,
      maxlength: 300,
    },

    status: {
      type: String,
      enum: RecallRequestStatusEnum,
      default: "pending",
      index: true,
    },

    expiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export type RecallRequestSchemaType = InferSchemaType<
  typeof RecallRequestSchema
>;

const RecallRequest = model<RecallRequestSchemaType>(
  "RecallRequest",
  RecallRequestSchema,
);

export default RecallRequest;