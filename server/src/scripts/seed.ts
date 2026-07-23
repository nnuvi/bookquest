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

    await User.updateMany(
      { profileImage: { $exists: false } },
      {
        $set: {
          profileImage: {
            url: "",
            publicId: "",
          },
        },
      },
    );

    await User.updateMany(
      { "profileImage.url": { $exists: false } },
      {
        $set: {
          "profileImage.url": "",
        },
      },
    );

    await User.updateMany(
      { "profileImage.publicId": { $exists: false } },
      {
        $set: {
          "profileImage.publicId": "",
        },
      },
    );

    console.log("Finished updating profile images.");

    console.log("Seeding completed!");

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    await mongoose.disconnect();
  }
};

seed();
