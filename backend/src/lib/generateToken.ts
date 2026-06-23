import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userID: string, res: Response) => {
  try {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET!, {
      expiresIn: "15d",
    });

    console.log("generated token in utils: ", token);

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });
  } catch (error: any) {
    console.error("Error generating token:", error.message);
  }
};
