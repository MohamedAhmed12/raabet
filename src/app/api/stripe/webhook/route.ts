"use server";

import prisma from "@/lib/prisma";
import { SubscriptionStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Define Stripe types
interface StripeSubscription extends Stripe.Subscription {
  current_period_end: number;
}

interface StripeInvoice extends Stripe.Invoice {
  subscription: string | null;
  period_end: number;
}

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  if (!sig) {
    return NextResponse.json(
      { error: "No signature provided" },
      { status: 400 }
    );
  }

  try {
    const event = await stripe.webhooks.constructEventAsync(
      rawBody,
      sig,
      process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event);
        break;
      case "payment_intent.payment_failed":
        await handlePaymentFailed(event);
        break;
      case "invoice.payment_failed":
        await handlePaymentFailed(event);
        break;
      case "invoice.payment_succeeded":
        await handlePaymentSucceeded(event);
        break;
      default:
        console.error(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook Error:", err.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }
}

async function updateSubscriptionInDatabase(
  customerId: string,
  subscription: StripeSubscription | StripeInvoice,
  status: SubscriptionStatus,
  paymentMethod: "stripe" = "stripe"
) {
  try {
    // Find the user associated with this customer
    const user = await prisma.user.findFirst({
      where: { stripeCustomerId: customerId },
      include: { subscriptions: true },
    });

    if (!user) {
      throw new Error("User not found for customer");
    }

    // Extract subscription details based on type
    const subscriptionId =
      "id" in subscription ? subscription.id : subscription.subscription || "";
    const amount =
      "amount_paid" in subscription
        ? subscription.amount_paid || 0
        : subscription.items.data[0]?.price.unit_amount || 0;
    const expiresAt =
      "period_end" in subscription
        ? new Date(subscription.period_end * 1000)
        : new Date(subscription.current_period_end * 1000);
    const stripeSessionId = subscriptionId;

    await prisma.subscription.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        stripeSessionId,
        status,
        paymentMethod,
        amount,
        expiresAt,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      update: {
        stripeSessionId,
        status,
        paymentMethod,
        amount,
        expiresAt,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Error updating subscription in database:", error);
    throw error;
  }
}

function mapStripeStatusToSubscriptionStatus(
  stripeStatus: string
): SubscriptionStatus {
  switch (stripeStatus) {
    case "active":
      return "active";
    case "trialing":
      return "trialing";
    case "paused":
    case "past_due":
    case "incomplete":
      return "pending";
    case "incomplete_expired":
    case "unpaid":
    case "canceled":
      return "canceled";
    default:
      return "canceled";
  }
}

async function handleSubscriptionUpdated(event: Stripe.Event) {
  const subscription = event.data.object as StripeSubscription;
  const customerId = subscription.customer as string;

  try {
    const subscriptionStatus = mapStripeStatusToSubscriptionStatus(
      subscription.status
    );
    await updateSubscriptionInDatabase(
      customerId,
      subscription,
      subscriptionStatus
    );
  } catch (error) {
    console.error("Error handling subscription updated:", error);
    throw error;
  }
}

async function handleSubscriptionDeleted(event: Stripe.Event) {
  const subscription = event.data.object as StripeSubscription;
  const customerId = subscription.customer as string;

  try {
    await updateSubscriptionInDatabase(customerId, subscription, "canceled");
  } catch (error) {
    console.error("Error handling subscription deleted:", error);
    throw error;
  }
}

async function handlePaymentSucceeded(event: Stripe.Event) {
  const invoice = event.data.object as StripeInvoice;
  const customerId = invoice.customer as string;

  try {
    await updateSubscriptionInDatabase(customerId, invoice, "active");
  } catch (error) {
    console.error("Error handling payment succeeded:", error);
    throw error;
  }
}

async function handlePaymentFailed(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  const customerId = paymentIntent.customer as string;

  try {
    // Find the user associated with this customer
    const user = await prisma.user.findFirst({
      where: { stripeCustomerId: customerId },
      include: { subscriptions: true },
    });

    if (!user) {
      throw new Error("User not found for customer");
    }

    // Update subscription status to failed
    await prisma.subscription.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        stripeSessionId: paymentIntent.id,
        status: "failed",
        paymentMethod: "stripe",
        amount: paymentIntent.amount || 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      update: {
        stripeSessionId: paymentIntent.id,
        status: "failed",
        paymentMethod: "stripe",
        amount: paymentIntent.amount || 0,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Error handling payment failed:", error);
    throw error;
  }
}
