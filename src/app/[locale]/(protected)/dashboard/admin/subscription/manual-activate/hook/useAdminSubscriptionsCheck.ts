"use client";

import { useQuery } from "@tanstack/react-query";
import { adminSubscriptionsCheck } from "../actions/adminSubscriptionsCheck";

export function useAdminSubscriptionsCheck(userId: string) {
  return useQuery({
    queryKey: ["adminSubscriptionsCheck", { userId }],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");
      const subscription = await adminSubscriptionsCheck(userId);
      if (!subscription) throw new Error("No subscription found for this user");
      return subscription;
    },
    enabled: false,
    retry: false,
    staleTime: 0,
  });
}
