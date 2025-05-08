import { GCSFileHandler } from "../../actions/GCSFileHandler";

export async function uploadToGCS(linkId: string, file: File): Promise<string> {
  if (!file || !file.type.startsWith("image/")) {
    throw new Error("Invalid file type.");
  }

  const fileName = `${linkId}-${Date.now()}-${file.name}`;
  const presignedUrl = await GCSFileHandler(fileName, file.type);

  const uploadRes = await fetch(presignedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error("Upload to Google Cloud Storage failed.");
  }
  return presignedUrl.split("?")[0]; // public URL
}
