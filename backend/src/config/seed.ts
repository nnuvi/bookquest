import mongoose from "mongoose";
import Book from "../model/Book.model.js";
import UserBook from "../model/UserBook.model.js";
import User from "../model/user.model.js"; // assuming you have this  import BorrowRequest from "../model/BorrowRequest.model.js";
import BorrowRecord from "../model/BorrowRecord.model.js";
import BorrowRequest from "../model/BorrowRequest.model.js";
import { Request, Response } from "express";
import connectMongoDB from "./connectMongoDB.js";
import bcrypt from "bcryptjs";

import dotenv from "dotenv";
dotenv.config();

const seed = async () => {
  try {
    if (!process.env.MONGO_URI)
      throw new Error("Mongo URI Missing. Add Mongo URI and Try Again.");
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    console.log("Start...");

    const users = [
      "6a3ab7ceb34b44bf27af2a27", // neve
      "6717d21ce19ee353a8302cd3", // nuvi
      "670fd9a1ec6b18e700a6f1f2",
      "6728e3488dd68787b583316f",
      "67189ad51b9ad794b47e866f",
    ];

    for (const userId of users) {
      await User.findByIdAndUpdate(userId, {
        $addToSet: {
          friends: { $each: users.filter((id) => id !== userId) },
        },
      });
    }

    console.log("Seeding completed!");

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    await mongoose.disconnect();
  }
};

seed();




