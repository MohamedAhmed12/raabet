"use client";

import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import Script from "next/script";
import { useEffect, useState } from "react";
import { createStripeCustomerSession } from "./actions/createStripeCustomerSession";
import { fetchSubscription } from "./actions/fetchSubscription";

export default function SubscriptionPage() {
  const locale = useLocale();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<any>(null);

  useEffect(() => {
    async function fetchSubscriptionStatus() {
      try {
        const subscription = await fetchSubscription();
        setSubscription(subscription);
      } catch (error) {
        console.error("Error fetching subscription status:", error);
      }
    }

    fetchSubscriptionStatus();
  }, []);

  useEffect(() => {
    async function fetchClientSecret() {
      try {
        const result = await createStripeCustomerSession();
        setClientSecret(result.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    }

    // Only fetch client secret if subscription is not active
    if (!subscription || subscription?.status !== "active") {
      fetchClientSecret();
    }
  }, [subscription]);

  return (
    <div className="py-10">
      {subscription && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                {subscription.status === "active"
                  ? "Active Subscription"
                  : "Subscription Pending"}
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  {subscription.status === "active"
                    ? "Your subscription is active. Enjoy all features!"
                    : "Please complete your payment to activate your subscription"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Script src="/js/stripe.js" strategy="beforeInteractive" />

      {clientSecret && subscription?.status !== "active" && (
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
  );
}
