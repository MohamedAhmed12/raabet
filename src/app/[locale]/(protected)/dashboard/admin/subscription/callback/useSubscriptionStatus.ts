"use client";

import { Subscription } from "@prisma/client";
import { useEffect, useState } from "react";
import { fetchSubscription } from "../actions/fetchSubscription";

export function useSubscriptionStatus({
  email,
  pollingInterval = 60000,
}: {
  email: string;
  pollingInterval?: number;
}) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchStatus = async () => {
      try {
        const subscription = await fetchSubscription(email);
        if (isMounted) {
          setSubscription(subscription);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching subscription status:", error);
        if (isMounted) {
          setSubscription(null);
          setIsLoading(false);
        }
      }
    };

    fetchStatus();
    const intervalId = setInterval(fetchStatus, pollingInterval);

    return () => {
      isMounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [email, pollingInterval]);

  return {
    subscription,
    status: subscription?.status || null,
    isLoading,
  };
}
