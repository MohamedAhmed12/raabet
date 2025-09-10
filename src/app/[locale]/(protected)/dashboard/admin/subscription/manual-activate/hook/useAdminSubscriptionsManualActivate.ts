"use client";

import { Subscription } from "@prisma/client";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { adminSubscriptionsManualActivate } from "../actions/adminSubscriptionsManualActivate";

export function useAdminSubscriptionsManualActivate(
  options?: Omit<
    UseMutationOptions<
      { success: boolean },
      Error,
      { subscription: Subscription; hasValidCoupon: boolean }
    >,
    "mutationKey" | "mutationFn"
  >
) {
  return useMutation({
    mutationKey: ["adminSubscriptionsManualActivate"],
    mutationFn: async ({
      subscription,
      hasValidCoupon,
    }: {
      subscription: Subscription;
      hasValidCoupon: boolean;
    }) => {
      if (!subscription) throw new Error("Subscription is required");
      const updatedSubscription = await adminSubscriptionsManualActivate(
        subscription,
        hasValidCoupon
      );
      if (!updatedSubscription)
        throw new Error("No subscription found for this user");
      return { success: true };
    },
    ...options,
  });
}
