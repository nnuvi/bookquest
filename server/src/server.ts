import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import connectMongoDB from "./config/connectMongoDB.js";
import logger from "./config/logger.js";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectMongoDB();

    app.listen(PORT, () => {
      logger.info(`Server started on port ${PORT}`);
    });
  } catch (error) {
    logger.error({
      message: "Failed to start server",
      error,
    });

    process.exit(1);
  }
};

startServer();