// hooks/useSubscriptionStatus.ts
"use client";

import { useState, useEffect } from "react";
import { fetchSubscription } from "../actions/fetchSubscription";
import { SubscriptionStatus } from "@prisma/client";


export function useSubscriptionStatus({
  email,
  pollingInterval = 60000,
}: {
  email: string;
  pollingInterval?: number;
}) {
  const [status, setStatus] = useState<SubscriptionStatus>(SubscriptionStatus.none);

  useEffect(() => {
    let isMounted = true;
    let intervalId: NodeJS.Timeout;

    const fetchStatus = async () => {
      try {
        const subscription = await fetchSubscription(email);
        if (isMounted) {
          setStatus(subscription?.status ?? SubscriptionStatus.none);
        }
      } catch (error) {
        console.error("Error fetching subscription status:", error);
        if (isMounted) {
          setStatus(SubscriptionStatus.none);
        }
      }
    };

    fetchStatus();

    intervalId = setInterval(fetchStatus, pollingInterval);

    return () => {
      isMounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [email, pollingInterval]);

  return { status };
}
