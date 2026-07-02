import mongoose from "mongoose";
import logger from "./logger.js";

const connectMongoDB = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is missing.");
  }

  try {
    const conn = await mongoose.connect(mongoUri);

    logger.info("MongoDB connected", {
      host: conn.connection.host,
      database: conn.connection.name,
      port: conn.connection.port,
    });

    // Connection event listeners
    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      logger.info("MongoDB reconnected");
    });

    mongoose.connection.on("error", (error) => {
      logger.error("MongoDB connection error", { error });
    });

  } catch (error) {
    logger.error("MongoDB connection failed", { error });

    throw error;
  }
};

export default connectMongoDB;