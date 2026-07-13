import mongoose, { InferSchemaType, model } from "mongoose";

const { Schema } = mongoose;

export const ReturnRequestStatusEnum = [
  "pending",
  "accepted",
  "declined",
  "cancelled",
  "expired",
] as const;

export type ReturnRequestStatus =
  (typeof ReturnRequestStatusEnum)[number];

const ReturnRequestSchema = new Schema(
  {
    borrowRecord: {
      type: Schema.Types.ObjectId,
      ref: "BorrowRecord",
      required: true,
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

    status: {
      type: String,
      enum: ReturnRequestStatusEnum,
      default: "pending",
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

    expiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export type ReturnRequestSchemaType = InferSchemaType<
  typeof ReturnRequestSchema
>;

const ReturnRequest = model<ReturnRequestSchemaType>(
  "ReturnRequest",
  ReturnRequestSchema,
);

export default ReturnRequest;