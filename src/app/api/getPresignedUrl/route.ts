import { Storage } from "@google-cloud/storage";
import { NextRequest, NextResponse } from "next/server";

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});
if (!process.env.GCS_BUCKET_NAME) {
  throw new Error("Environment variable GCS_BUCKET_NAME is not defined");
}
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);
console.log("Bucket naME:", bucket); 
// Get bucket metadata to log the storage class
try {
  const [metadata] = await bucket.getMetadata();
  console.log("Bucket metadata:", metadata); 
  console.log(`Bucket name: ${bucket.name}`); // Bucket name
  console.log(`Bucket storage class: ${metadata.storageClass}`); // Storage class
} catch (error) {
  console.error("Error fetching bucket metadata:", error);
}

export async function POST(req: NextRequest) {
  const { fileName, contentType } = await req.json();

  if (!fileName || !contentType) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const [url] = await bucket.file(fileName).getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000,
      contentType,
    });
    console.log("Generated presigned URL:", url);
    return NextResponse.json({ presignedUrl: url });
  } catch (error) {
    console.error("Error generating presigned URL:", error); 
    return NextResponse.json({ error: "Failed to generate presigned URL" }, { status: 500 });
  }
}
