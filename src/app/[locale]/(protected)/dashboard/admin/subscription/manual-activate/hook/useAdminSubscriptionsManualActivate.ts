"use client";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { adminSubscriptionsManualActivate } from "../actions/adminSubscriptionsManualActivate";

export function useAdminSubscriptionsManualActivate(
  options?: Omit<
    UseMutationOptions<{ success: boolean }, Error, { userId: string }>,
    "mutationKey" | "mutationFn"
  >
) {
  return useMutation({
    mutationKey: ["adminSubscriptionsManualActivate"],
    mutationFn: async ({ userId }: { userId: string }) => {
      if (!userId) throw new Error("User ID is required");
      const subscription = await adminSubscriptionsManualActivate(userId);
      if (!subscription) throw new Error("No subscription found for this user");
      return { success: true };
    },
    ...options,
  });
}
