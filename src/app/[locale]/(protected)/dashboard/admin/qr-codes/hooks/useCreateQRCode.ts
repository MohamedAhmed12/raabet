import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { QRCode } from "@prisma/client";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { createQRCode } from "../actions/createQRCode";

interface QRCodeCustomization {
  qrSize?: number;
  qrLevel?: "L" | "M" | "Q" | "H";
  includeMargin?: boolean;
  foregroundColor?: string;
  backgroundColor?: string;
  qrShape?: "square" | "circle";
  logoUrl?: string;
}

export function useCreateQRCode(
  options?: Omit<
    UseMutationOptions<QRCode, Error, { url: string; customization?: QRCodeCustomization }>,
    "mutationKey" | "mutationFn"
  >
) {
  const queryClient = useQueryClient();
  const linkId = useLinkStore((state) => state.link.id);

  return useMutation<QRCode, Error, { url: string; customization?: QRCodeCustomization }>({
    mutationKey: ["createQRCode"],
    mutationFn: async ({ url, customization }) => {
      if (!url) {
        throw new Error("URL is required");
      }
      if (!linkId) {
        throw new Error("Link ID is required");
      }
      return createQRCode(url, linkId, customization);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listQRCodes"] });
    },
    ...options,
  });
}
