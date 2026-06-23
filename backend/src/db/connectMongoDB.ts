import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    if (!process.env.MONGO_URI)
      throw new Error("Mongo URI Missing. Add Mongo URI and Try Again.");
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDB");
    process.exit(1);
  }
};

export default connectMongoDB;
