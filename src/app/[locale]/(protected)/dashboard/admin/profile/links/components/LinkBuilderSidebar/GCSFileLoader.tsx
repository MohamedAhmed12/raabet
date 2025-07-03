import { GCSFileUploader } from "../../actions/GCSFileUploader";

const MAX_FILE_SIZE = 80 * 1024 * 1024; // 80MB in bytes

// List of safe MIME types to accept
const ALLOWED_MIME_TYPES = [
  // Images
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  // Documents
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "text/csv",
  // Archives
  "application/zip",
  "application/x-rar-compressed",
  "application/x-7z-compressed",
  // Audio/Video
  "audio/mpeg",
  "audio/wav",
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

export async function GCSFileLoader(
  linkId: string,
  file: File
): Promise<string> {
  try {
    // Validate file exists
    if (!file) {
      throw new Error("No file provided.");
    }

    console.log("size", file?.size);
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(
        `File size exceeds the maximum limit of ${
          MAX_FILE_SIZE / (1024 * 1024)
        }MB`
      );
    }

    // Validate MIME type
    if (
      !ALLOWED_MIME_TYPES.includes(file.type) &&
      !file.type.startsWith("application/octet-stream")
    ) {
      throw new Error("File type not allowed. Please upload a valid file.");
    }

    const fileName = `${linkId}-${Date.now()}-${file.name}`;
    const presignedUrl = await GCSFileUploader(fileName, file.type);

    const uploadRes = await fetch(presignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });
    console.log("uploadRes", uploadRes);

    if (!uploadRes.ok) {
      throw new Error("Upload to Google Cloud Storage failed.");
    }
    return presignedUrl.split("?")[0];
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}
