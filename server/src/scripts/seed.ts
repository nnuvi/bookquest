import mongoose from "mongoose";
import User from "../model/user.model.js"; // assuming you have this  import BorrowRequest from "../model/BorrowRequest.model.js";

import dotenv from "dotenv";
// import { createBooks, createBorrowRequests } from "./book.seed.js";
dotenv.config();

const seed = async () => {
  try {
    if (!process.env.MONGO_URI)
      throw new Error("Mongo URI Missing. Add Mongo URI and Try Again.");
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    console.log("Start...");

    // Code
    const user_1 = await User.findOne({ username: "neve" });
    const user_2 = await User.findOne({ username: "nuvi11" });

    if (!user_1 || !user_2) {
      throw new Error("Seed users not found.");
    }

    const user_1_id = user_1._id.toString();
    const user_2_id = user_2._id.toString();

    console.log("Seeding completed!");

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    await mongoose.disconnect();
  }
};

seed();
