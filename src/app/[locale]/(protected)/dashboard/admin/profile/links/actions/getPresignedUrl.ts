// app/actions/getPresignedUrl.ts
"use server";

import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME!);

export async function getPresignedUrl(fileName: string, contentType: string) {
  if (!fileName || !contentType) {
    throw new Error("Missing parameters");
  }

  try {
    const [url] = await bucket.file(fileName).getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000, 
      contentType,
    });
    return url;
  } catch (error) {
    throw new Error("Failed to generate presigned URL");
  }
}
