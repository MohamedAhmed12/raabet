import { useMutation } from "@tanstack/react-query";
import { uploadScreenshot } from "../actions/uploadScreenshot";

type UploadScreenshotResponse = {
  id: string;
  userId: string;
  status: string;
  paymentScreenshot: string | null;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date | null;
};

export function useUploadScreenshot() {
  return useMutation<UploadScreenshotResponse, Error, string>({
    mutationFn: async (invoiceURL) => {
      return uploadScreenshot(invoiceURL);
    },
  });
}
