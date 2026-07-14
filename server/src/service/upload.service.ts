import cloudinary from "../config/cloudinary.js";
import ApiError from "../lib/apiError.js";
import { HTTP_STATUS } from "../constant/httpStatus.js";

import { Readable } from "stream";
import { UploadApiOptions, UploadApiResponse } from "cloudinary";
import logger from "../config/logger.js";

type UploadOptions = {
  folder?: string;
};

export async function uploadImage(buffer: Buffer, options?: UploadApiOptions) {
  logger.info("Uploading image to Cloudinary...", {
    folder: options?.folder,
  });

  logger.debug("Coudinary Upload Options: ", { options });

  try {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) return reject(error);
          if (!result)
            return reject(new Error("Cloudinary returned no result."));
          resolve(result);
        },
      );
      upload.end(buffer);
    });

    logger.debug("Coudinary Upload Result: ", { result, options });

    logger.debug("Cloudinary upload successful.", {
      publicId: result.public_id,
      url: result.secure_url,
    });

    logger.info("Cloudinary upload successful.");

    return result;
  } catch (error) {
    logger.error("Cloudinary upload failed.", {
      error,
    });

    throw error;
  }
}

export function ensureImageProvided(file?: Express.Multer.File) {
  if (!file) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Please select a profile image.",
    );
  }

  return file;
}

export async function deleteImage(publicId: string): Promise<void> {
  if (!publicId) return;

  await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
}
