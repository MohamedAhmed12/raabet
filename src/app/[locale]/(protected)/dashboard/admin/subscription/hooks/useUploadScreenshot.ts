import { useMutation, UseMutationOptions } from "@tanstack/react-query";
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

export function useUploadScreenshot(
  options?: Omit<
    UseMutationOptions<UploadScreenshotResponse, Error, string>,
    "mutationFn"
  >
) {
  return useMutation<UploadScreenshotResponse, Error, string>({
    mutationFn: async (invoiceURL) => {
      return uploadScreenshot(invoiceURL);
    },
    ...options,
  });
}
