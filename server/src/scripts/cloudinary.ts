import cloudinary from "../config/cloudinary.js";
import logger from "../config/logger.js";

async function testCloudinary() {
  logger.debug("Cloudinary config", {
    cloud: cloudinary.config().cloud_name,
    key: cloudinary.config().api_key?.slice(0, 6),
    secretLength: cloudinary.config().api_secret?.length,
  });

  try {
    const result = await cloudinary.uploader.upload("./src/scripts/test.png");

    // console.log(result);
  } catch (error: any) {
    console.error(error);
    // console.dir(error, { depth: null });

    // console.log("status:", error.http_code);
    // console.log("message:", error.message);
    // console.log("response:", error.response);
    // console.log("error:", error.error);
    // console.log("body:", error.body);
  }
}

testCloudinary();
