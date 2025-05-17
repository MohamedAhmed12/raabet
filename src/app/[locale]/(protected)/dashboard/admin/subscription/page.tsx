import Script from "next/script";
import React from "react";

export default function Subscripe() {
  return (
    <>
      <Script src="/js/stripe.js" strategy="beforeInteractive" />
      <div className="flex justify-center items-center w-full h-full">
        <stripe-pricing-table
          className="h-10"
          pricing-table-id={process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID}
          publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
        ></stripe-pricing-table>
      </div>
    </>
  );
}
