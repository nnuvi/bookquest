import { v2 as cloudinary } from "cloudinary";
import logger from "./logger.js";
import env from "../config/env.js";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  logger.error("Cloudinary environment variables are missing.");
  logger.debug("Cloudinary keys: ", {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
  });
  throw new Error("Cloudinary environment variables are missing.");
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// logger.debug("Cloudinary config", {
//   config: cloudinary.config(),
// });

try {
  const result = await cloudinary.api.ping();
  logger.info("Cloudinary ping successful", result);
} catch (error) {
  logger.error("Cloudinary ping failed", error);
}

logger.info("Cloudinary configured successfully.");

export default cloudinary;
