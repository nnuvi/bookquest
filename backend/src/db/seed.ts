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

    await BorrowRecord.deleteMany({});
    await BorrowRequest.deleteMany({});

    const nuvi = "6728e3488dd68787b583316f";
    const neve = "6a3ab7ceb34b44bf27af2a27";

    const neveBook = "6a3ab9eac3d53434722b2d9d";
    const nuviBook1 = "6a3aee70fba3aa50bbca3b95";
    const nuviBook2 = "6a3aee70fba3aa50bbca3b93";
    const nuviBook3 = "6a3aee70fba3aa50bbca3b96";

    // Requests
    const requests = await BorrowRequest.insertMany([
      {
        requester: nuvi,
        owner: neve,
        userBook: neveBook,
        status: "approved",
        message: "Need this for a week.",
      },

      {
        requester: neve,
        owner: nuvi,
        userBook: nuviBook2,
        status: "pending",
        message: "Need it for my finance course.",
      },

      {
        requester: nuvi,
        owner: neve,
        userBook: neveBook,
        status: "declined",
        message: "Can I borrow it again?",
      },

      {
        requester: neve,
        owner: nuvi,
        userBook: nuviBook3,
        status: "approved",
        message: "Looks interesting.",
      },

      {
        requester: nuvi,
        owner: neve,
        userBook: neveBook,
        status: "approved",
        message: "One more request.",
      },
    ]);

    // Borrowed
    await BorrowRecord.create({
      borrowRequest: requests[0]?._id,

      borrower: nuvi,
      owner: neve,

      userBook: neveBook,

      borrowDate: new Date(),

      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),

      status: "borrowed",
    });

    // Returned
    await BorrowRecord.create({
      borrowRequest: requests[3]?._id,

      borrower: neve,
      owner: nuvi,

      userBook: nuviBook3,

      borrowDate: new Date("2026-06-01"),

      dueDate: new Date("2026-06-15"),

      returnDate: new Date("2026-06-12"),

      status: "returned",
    });

    // Overdue
    await BorrowRecord.create({
      borrowRequest: requests[4]?._id,

      borrower: nuvi,
      owner: neve,

      userBook: neveBook,

      borrowDate: new Date("2026-05-01"),

      dueDate: new Date("2026-05-15"),

      status: "overdue",
    });

    console.log("Seeding completed!");

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    await mongoose.disconnect();
  }
};

seed();
