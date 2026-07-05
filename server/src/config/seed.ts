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
import FriendRequest from "../model/FriendRequest.model.js";
import Notification, {
  NotificationEvents,
} from "../model/Notification.model.js";
import {
  connectFriends,
  createFriendRequests,
  createFriendRequestsIds,
  createUsers,
  getUserIdsByUsername,
} from "./user.seed.js";
import { createBooks, createBorrowRequests } from "./book.seed.js";
import { createNotifications } from "./notification.seed.js";
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

    // const users = await createUsers();

    // await connectFriends(users, user_1, user_2);

    // await createBooks(users);

    // await createFriendRequests(users, user_1, user_2);

    // await createBorrowRequests(users, user_1, user_2);

    // await createNotifications(users, user_1, user_2);

    const ids = await getUserIdsByUsername([
      "sara",
      "sophia",
      "meii",
      "dazai",
      "kate",
      "senku",
    ]);

    await createFriendRequestsIds(ids, user_1_id, user_2_id);

    console.log("Seeding completed!");

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    await mongoose.disconnect();
  }
};

seed();
