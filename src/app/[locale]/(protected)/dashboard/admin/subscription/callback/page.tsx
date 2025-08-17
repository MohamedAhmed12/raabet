"use server";

import { getTranslations } from "next-intl/server";
import Stripe from "stripe";
import { updateSubscription } from "../actions/updateSubscription";
import ClientStatusCard from "./ClientStatusCard";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || "");

export default async function SessionPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const t = await getTranslations("Subscription");
  const param = await searchParams;
  const sessionId = param?.session_id;

  if (!sessionId) {
    throw new Error("Session ID is missing");
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      throw new Error("Session not found");
    }

    const customerId = session?.customer as string;
    const paymentStatus = session?.payment_status;

    if (!customerId || !paymentStatus) {
      throw new Error("Customer ID & Payment Status are required!");
    }

    // Update subscription in the database
    const subscription = await updateSubscription(customerId, {
      stripeSessionId: sessionId,
      stripePaymentStatus: paymentStatus,
    });

    return (
      <ClientStatusCard
        title={t("paymentStatus.succeeded")}
        subscription={subscription}
      />
    );
  } catch (error: unknown) {
    console.error("Error fetching session:", error);
    return (
      <ClientStatusCard
        title={t("paymentStatus.failed")}
        tryAgainMsg={t("tryAgainMsg")}
      />
    );
  }
}
