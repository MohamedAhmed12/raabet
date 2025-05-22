"use client";

import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { createStripeCustomerSession } from "./actions/createStripeCustomerSession";
import { useSubscriptionStatus } from "./callback/useSubscriptionStatus";
import SubscriptionStatusCard from "./SubscriptionStatusCard";
import { problemStatuses } from "./types/subscripiton";

export default function SubscriptionPage() {
  const locale = useLocale();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const session = useSession();
  const { status, isLoading } = useSubscriptionStatus({
    email: session?.data?.user?.email || "",
  });
  const needResubscription = status && problemStatuses.includes(status);
  const showStirpePricingTable = clientSecret && needResubscription;
  const showSubscriptionStatusCard =
    status && !problemStatuses.includes(status);

  useEffect(() => {
    async function fetchClientSecret() {
      try {
        const result = await createStripeCustomerSession();
        setClientSecret(result?.clientSecret);
      } catch (error) {
        console.error("Failed to create Stripe customer session:", error);
      }
    }

    // Only fetch client secret if subscription is not active
    if (needResubscription) {
      fetchClientSecret();
    }
  }, [status]);

  return (
    <>
      <script async src="/js/stripe.js"></script>
      <div
        className={cn(
          isLoading || showSubscriptionStatusCard
            ? "mt-[-44px] h-[calc(100vh-44px)]"
            : "h-auto"
        )}
      >
        {isLoading ? (
          <div className="flex h-full justify-center items-center">
            <LoaderCircle className="animate-spin" size={45} />
          </div>
        ) : (
          <div className="py-10">
            {showSubscriptionStatusCard && (
              <SubscriptionStatusCard status={status} />
            )}
            {showStirpePricingTable && (
              <stripe-pricing-table
                className={cn("h-10", `${locale}-stripe`)}
                pricing-table-id={
                  locale === "ar"
                    ? process.env.NEXT_PUBLIC_STRIPE_AR_PRICING_TABLE_ID
                    : process.env.NEXT_PUBLIC_STRIPE_ENG_PRICING_TABLE_ID
                }
                publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
                customer-session-client-secret={clientSecret}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
