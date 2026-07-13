import { z } from "zod";
import mongoose from "mongoose";

const objectId = z.string().refine(
  (id) => mongoose.Types.ObjectId.isValid(id),
  {
    message: "Invalid ObjectId",
  },
);

export const sendReturnRequestSchema = z.object({
  params: z.object({
    borrowRecordId: objectId,
  }),
  body: z.object({
    message: z.string().trim().max(500).optional(),
  }),
});

export const respondReturnRequestSchema = z.object({
  params: z.object({
    requestId: objectId,
  }),
  body: z.object({
    status: z.enum(["accepted", "declined"]),
  }),
}); 

export const cancelReturnRequestSchema = z.object({
  params: z.object({
    requestId: objectId,
  }),
});

export const sendReturnReminderSchema = z.object({
  params: z.object({
    borrowRecordId: objectId,
  }),
  body: z.object({}),
});