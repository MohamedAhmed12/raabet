import { GCSFileUploader } from "../../actions/GCSFileUploader";

export async function GCSFileLoader(linkId: string, file: File): Promise<string> {
  if (!file || !file.type.startsWith("image/")) {
    throw new Error("Invalid file type.");
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

  if (!uploadRes.ok) {
    throw new Error("Upload to Google Cloud Storage failed.");
  }
  return presignedUrl.split("?")[0]; 
}
