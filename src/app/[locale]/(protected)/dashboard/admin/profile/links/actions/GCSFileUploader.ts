"use server";

import { Storage } from "@google-cloud/storage";
import { logError } from "@/lib/errorHandling";

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});
const bucketName = process.env.GCS_BUCKET_NAME;

if (!bucketName) {
  throw new Error("Google Cloud Storage bucket name is required.");
}

const bucket = storage.bucket(bucketName);

export async function GCSFileUploader(fileName: string, contentType: string) {
  if (!fileName || !contentType) {
    const error = new Error("Missing required parameters");
    logError(error, {
      action: "GCSFileUploader",
      errorType: "ValidationError",
      fileName: fileName || "undefined",
      contentType: contentType || "undefined"
    });
    throw error
  }

  try {
    const [url] = await bucket?.file(fileName).getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000,
      contentType,
    });
    return url;
  } catch (error) {
    logError(error, {
      action: "GCSFileUploader/generatePresignedUrl",
      errorType: error instanceof Error ? error.constructor.name : "UnknownError",
      fileName: fileName || "undefined",
      contentType: contentType || "undefined"
    });
    
    throw new Error("Failed to generate upload URL. Please try again.");
  }
}
