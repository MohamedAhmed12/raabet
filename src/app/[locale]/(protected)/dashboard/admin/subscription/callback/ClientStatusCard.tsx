"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import CallbackStatusCard from "./CallbackStatusCard";

export default function ClientStatusCard({
  title,
  tryAgainMsg,
  subscription,
}: {
  title: string;
  tryAgainMsg?: string;
  subscription?: any;
}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (subscription?.user?.email) {
      // Invalidate the subscription status query
      queryClient.invalidateQueries({
        queryKey: ["subscriptionStatus", { email: subscription.user.email }],
      });

      // Update the subscription data directly in the cache
      queryClient.setQueryData(
        ["subscriptionStatus", { email: subscription.user.email }],
        subscription
      );
    }
  }, [subscription, queryClient]);

  return <CallbackStatusCard title={title} tryAgainMsg={tryAgainMsg} />;
}
