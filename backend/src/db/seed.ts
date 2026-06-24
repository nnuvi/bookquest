import mongoose from "mongoose";
import Book from "../model/Book.model.js";
import UserBook from "../model/UserBook.model.js";
import User from "../model/user.model.js"; // assuming you have this
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

    const hashedPassword = await bcrypt.hash("userpass", 10);

    // const user = await User.create({
    //   username: "user",
    //   fullName: "User",
    //   email: "user@mail.com",
    //   password: hashedPassword,
    //   bio: "Book lover",
    //   role: "user",
    // });

    // console.log("User created:", user.username);

    const findUser = await User.findOne({ username: "nuvi11" });
    if (!findUser) throw new Error("No user found. Create a user first.");

    console.log("Adding Books...");
    // 1. Books dummy data
    const books = await Book.find({
      isbn: {
        $in: ["9780735211292", "9780061122415", "9780132350884"],
      },
    });

    const extraBooks = await Book.insertMany([
      {
        title: "Sapiens: A Brief History of Humankind",
        author: ["Yuval Noah Harari"],
        isbn: "9780062316097",
        publisher: "Harper",
        description: "A journey through human history and evolution.",
        coverImage: "",
        rating: { average: 4.7, count: 50000 },
      },
      {
        title: "Think and Grow Rich",
        author: ["Napoleon Hill"],
        isbn: "9780449214923",
        publisher: "Ballantine Books",
        description: "Classic personal development and wealth mindset book.",
        coverImage: "",
        rating: { average: 4.6, count: 35000 },
      },
      {
        title: "The Psychology of Money",
        author: ["Morgan Housel"],
        isbn: "9780857197689",
        publisher: "Harriman House",
        description: "Timeless lessons on wealth, greed, and happiness.",
        coverImage: "",
        rating: { average: 4.8, count: 60000 },
      },
    ]);
    // const books = await Book.find([
    //   {
    //     title: "Atomic Habits",
    //     author: ["James Clear"],
    //     isbn: "9780735211292",
    //   },
    //   {
    //     title: "The Alchemist",
    //     author: ["Paulo Coelho"],
    //     isbn: "9780061122415",
    //   },
    //   {
    //     title: "Clean Code",
    //     author: ["Robert C. Martin"],
    //     isbn: "9780132350884",
    //   },
    // ]);

    // console.log("Books inserted");

    console.log("adding UseeBooks...");
    // 2. UserBook dummy data
    await UserBook.insertMany([
      {
        owner: findUser._id,
        book: extraBooks[0]?._id,
        condition: "good",
        availability: "available",
        inputSource: {
          method: "manual",
          rawInput: "added manually",
          confidence: 1,
        },
        notes: "Must-read history book",
      },
      {
        owner: findUser._id,
        book: extraBooks[1]?._id,
        condition: "new",
        availability: "available",
        inputSource: {
          method: "manual",
          rawInput: "added manually",
          confidence: 1,
        },
        notes: "Motivation and mindset",
      },
      {
        owner: findUser._id,
        book: extraBooks[2]?._id,
        condition: "good",
        availability: "borrowed",
        inputSource: {
          method: "manual",
          rawInput: "added manually",
          confidence: 1,
        },
        notes: "Finance psychology book",
      },
      {
        owner: findUser._id,
        book: books[0]?._id,
        condition: "good",
        availability: "available",
        inputSource: {
          method: "manual",
          rawInput: "manual entry",
          confidence: 1,
        },
        notes: "My personal favorite",
      },
      {
        owner: findUser._id,
        book: books[1]?._id,
        condition: "new",
        availability: "borrowed",
        inputSource: {
          method: "isbn",
          rawInput: "9780061122415",
          confidence: 0.95,
        },
        notes: "Currently lent to friend",
      },
      {
        owner: findUser._id,
        book: books[2]?._id,
        condition: "fair",
        availability: "available",
        inputSource: {
          method: "ai",
          rawInput: "Clean Code detected",
          confidence: 0.87,
        },
        notes: "",
      },
    ]);

    console.log("UserBooks inserted!");
    console.log("Seeding completed!");

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    await mongoose.disconnect();
  }
};

seed();
