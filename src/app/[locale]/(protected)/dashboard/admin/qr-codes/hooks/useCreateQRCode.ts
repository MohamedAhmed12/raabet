import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { QRCode } from "@prisma/client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { createQRCode } from "../actions/createQRCode";

export function useCreateQRCode(
  options?: Omit<
    UseMutationOptions<QRCode, Error, { url: string }>,
    "mutationKey" | "mutationFn"
  >
) {
  const linkId = useLinkStore((state) => state.link.id);

  return useMutation<QRCode, Error, { url: string }>({
    mutationKey: ["createQRCode"],
    mutationFn: async ({ url }) => {
      if (!linkId) {
        throw new Error("Link ID is required");
      }
      return createQRCode(url, linkId);
    },
    ...options,
  });
}
