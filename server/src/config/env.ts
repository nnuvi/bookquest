import dotenv from "dotenv";

dotenv.config();

/**
 * Centralized environment configuration
 *
 * - avoids repeating process.env everywhere
 * - prevents undefined runtime crashes
 * - keeps backend config clean & maintainable
 */

const env = {
  // SERVER
  PORT: Number(process.env.PORT) || 5555,
  NODE_ENV: process.env.NODE_ENV || "development",

  // DATABASE
  MONGO_URI: process.env.MONGO_URI as string,

  // AUTH
  JWT_SECRET: process.env.JWT_SECRET as string,

  // CLOUDINARY
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL as string,

  // CORS ORIGINS
  CLIENT_LOCAL_URL: process.env.CLIENT_LOCAL_URL as string,
  CLIENT_MOBILE_URL: process.env.CLIENT_MOBILE_URL as string,
  CLIENT_BASE_URL: process.env.CLIENT_BASE_URL as string,

  NODE_API_LOCAL_URL: process.env.NODE_API_LOCAL_URL as string,
};

/**
 * FAIL FAST CHECKS
 * If critical env is missing server should NOT start
 */

const requiredEnvVars = [
  { key: "MONGO_URI", value: env.MONGO_URI },
  { key: "JWT_SECRET", value: env.JWT_SECRET },
];

for (const item of requiredEnvVars) {
  if (!item.value) {
    throw new Error(`Missing environment variable: ${item.key}`);
  }
}

export default env;
