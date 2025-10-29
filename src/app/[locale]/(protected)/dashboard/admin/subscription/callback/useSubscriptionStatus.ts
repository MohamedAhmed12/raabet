"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchSubscription } from "../actions/fetchSubscription";

export function useSubscriptionStatus({
  email,
  pollingInterval = 5 * 60 * 1000,
}: {
  email: string;
  pollingInterval?: number;
}) {
  return useQuery({
    queryKey: ["subscriptionStatus", { email }],
    queryFn: async () => {
      if (!email) {
        throw new Error("User ID or username is required");
      }
      const subscription = await fetchSubscription(email);

      if (!subscription) {
        throw new Error("Error fetching subscription status");
      }

      return subscription.status;
    },
    enabled: !!email, // Only run the query if we have email
    staleTime: 2 * 60 * 1000, // 2 minutes - data is fresh for 2 minutes
    refetchOnMount: false, // Don't refetch on mount if data exists
    refetchInterval: pollingInterval,
  });
}
