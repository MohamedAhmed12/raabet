"use client";

import { SubscriptionStatus } from "@prisma/client";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { createStripeCustomerSession } from "./actions/createStripeCustomerSession";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SubscriptionFormProps {
  status: SubscriptionStatus;
}

export default function SubscriptionForm({ status }: SubscriptionFormProps) {
  const locale = useLocale();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showManualPayment, setShowManualPayment] = useState(false);

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
    if (status !== "active") {
      fetchClientSecret();
    }
  }, [status]);

  return (
    <div className="flex items-center justify-center flex-1">
      {showManualPayment ? (
        <div>instapay and v cash upload form</div>
      ) : (
        clientSecret && (
          <stripe-pricing-table
            className={cn("", `${locale}-stripe`)}
            pricing-table-id={
              locale === "ar"
                ? process.env.NEXT_PUBLIC_STRIPE_AR_PRICING_TABLE_ID
                : process.env.NEXT_PUBLIC_STRIPE_ENG_PRICING_TABLE_ID
            }
            publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
            customer-session-client-secret={clientSecret}
          />
        )
      )}

      <div className="fixed bottom-6 right-6">
        <Button
          variant="ghost"
          className="flex items-center justify-center gap-2 rounded-full p-0 shadow-lg focus:outline-none w-[150px] h-[60px] cursor-pointer hover:bg-gray-200"
          onClick={() => alert("Pay with Vodafone Cash and Instapay")}
        >
          <Image
            src="/images/instapay-v-cash.png"
            alt="Instapay"
            width={250}
            height={60}
          />
        </Button>
      </div>
    </div>
  );
}
