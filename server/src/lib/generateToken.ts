import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userID: string, res: Response) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    const token = jwt.sign({ userID }, process.env.JWT_SECRET!, {
      expiresIn: "15d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      // secure: false,
      // sameSite: "lax",
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });
  } catch (error: any) {
    console.error("Error generating token:", error.message);
  }
};
