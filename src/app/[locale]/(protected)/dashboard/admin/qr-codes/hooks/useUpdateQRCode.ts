"use client";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { updateQRCode } from "../actions/updateQRCode";

interface MutationVars {
  id: string;
  destination_url?: string;
  customization?: {
    qrSize?: number;
    qrLevel?: "L" | "M" | "Q" | "H";
    includeMargin?: boolean;
    foregroundColor?: string;
    backgroundColor?: string;
    qrShape?: "square" | "circle";
    logoUrl?: string | null;
  };
}

export function useUpdateQRCode(
  options?: UseMutationOptions<
    { success: boolean; qr: any },
    Error,
    MutationVars
  >
) {
  return useMutation({
    mutationFn: async (vars: MutationVars) => {
      const res = await updateQRCode(vars);
      return { success: true, qr: res.qr };
    },
    ...options,
  });
}
