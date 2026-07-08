import { z } from "zod";
import {
  bookIdParams,
  objectIdParams,
  requestIdParams,
} from "./common.validation.js";
import { BorrowRequestStatusEnum } from "../model/BorrowRequest.model.js";
import { ReturnRequestStatusEnum } from "../model/ReturnRequest.model.js";

const BorrowRequestActionValues = BorrowRequestStatusEnum.filter(
  (status) => status !== "pending",
) as ["accepted", "declined"];

const ReturnRequestActionValues = ReturnRequestStatusEnum.filter(
  (status) => status !== "pending",
) as ["accepted", "declined"];

export const BorrowRequestActionSchema = z.enum(BorrowRequestActionValues);

export const ReturnRequestActionSchema = z.enum(ReturnRequestActionValues);

export const sendBorrowRequestSchema = bookIdParams(
  "Send Borrow Request Book ID",
);

export const borrowStatusSchema = bookIdParams("Borrow Statues Book ID");

export const respondBorrowRequestSchema = requestIdParams(
  "Borrow Request ID",
).extend({
  body: z.object({
    action: BorrowRequestActionSchema,
  }),
});

export const cancelBorrowRequestSchema = requestIdParams(
  "Cancel Borrow Request ID",
);

export const sendReturnRequestSchema = requestIdParams("Borrow Request ID");

export const respondReturnRequestSchema = requestIdParams(
  "Return Request ID",
).extend({
  body: z.object({
    action: ReturnRequestActionSchema,
  }),
});

// export const cancelReturnRequestSchema = requestIdParams("Return Request ID");
