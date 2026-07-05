import { ZodType } from "zod";
import { asyncHandler } from "../lib/asyncHandler.js";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodType) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      params: req.params,
      body: req.body,
      query: req.query,
    });

    next();
  });

// import { Request, Response, NextFunction } from "express";
// import mongoose from "mongoose";
// import { HTTP_STATUS } from "../constant/httpStatus.js";

// export const validateObjectIdParam =
//   (paramName: string) => (req: Request, res: Response, next: NextFunction) => {
//     const value = req.params[paramName];

//     if (!value) {
//       return res.status(HTTP_STATUS.BAD_REQUEST).json({
//         success: false,
//         message: `${paramName} is required.`,
//       });
//     }

//     if (!mongoose.Types.ObjectId.isValid(value)) {
//       return res.status(HTTP_STATUS.BAD_REQUEST).json({
//         success: false,
//         message: `Invalid ${paramName}.`,
//       });
//     }

//     next();
//   };

// const validActions = ["accepted", "declined"] as const;

// export function validateFriendAction(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   const { action } = req.params;

//   if (
//     !action ||
//     !validActions.includes(action as (typeof validActions)[number])
//   ) {
//     return res.status(HTTP_STATUS.BAD_REQUEST).json({
//       success: false,
//       message: "Invalid action.",
//     });
//   }

//   next();
// }
