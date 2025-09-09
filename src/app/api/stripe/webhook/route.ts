"use server";

import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";
import { SubscriptionStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Define Stripe types
interface StripeSubscription extends Stripe.Subscription {
  subscription: string | null;
  current_period_end: number;
}

interface StripeInvoice extends Stripe.Invoice {
  id: string;
  subscription: string | null;
  period_end: number;
  discount: {
    id: string;
    promotion_code: string;
    coupon: {
      id: string;
      object: string;
      amount_off: null;
      created: number;
      currency: null;
      duration: string;
      duration_in_months: null;
      livemode: false;
      max_redemptions: null;
      name: null;
      percent_off: number;
      redeem_by: null;
      times_redeemed: number;
      valid: boolean;
    };
  };
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
        logError(`Unhandled event type ${event.type}`, {
          action: "stripeWebhook/event/handling",
          errorType: "ValidationError",
        });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    logError(`Webhook Error: ${err.message}`, {
      action: "stripeWebhook/POST",
      errorType: "ValidationError",
    });
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
      const err = "User not found for customer";
      logError(`${err}: ${customerId}`, {
        action: "updateSubscriptionInDatabase",
        errorType: "ValidationError",
      });
      throw new Error(err);
    }

    // Extract subscription details based on type
    const subscriptionId =
      "subscription" in subscription
        ? (subscription as StripeInvoice).subscription || ""
        : (subscription as StripeSubscription).id;
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
    logError(`Error updating subscription in database: ${error}`, {
      action: "updateSubscriptionInDatabase",
      errorType: "ValidationError",
    });
    throw error;
  }
}

async function updateCouponInDatabase(stripeId: string) {
  try {
    const coupon = await prisma.coupon.findFirst({
      where: { stripeId },
    });
    if (!coupon) {
      const err = "Coupon not found for stripeId";
      logError(`${err}: ${stripeId}`, {
        action: "updateCouponInDatabase",
        errorType: "ValidationError",
      });
      throw new Error(err);
    }
    await prisma.coupon.update({
      where: { id: coupon.id },
      data: {
        usedAt: new Date(),
      },
    });
  } catch (error) {
    logError(`Error updating coupon in database: ${error}`, {
      action: "updateCouponInDatabase",
      errorType: "ValidationError",
    });
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
    logError(`Error handling subscription updated: ${error}`, {
      action: "handleSubscriptionUpdated",
      errorType: "ValidationError",
    });
    throw error;
  }
}

async function handleSubscriptionDeleted(event: Stripe.Event) {
  const subscription = event.data.object as StripeSubscription;
  const customerId = subscription.customer as string;

  try {
    await updateSubscriptionInDatabase(customerId, subscription, "canceled");
  } catch (error) {
    logError(`Error handling subscription deleted: ${error}`, {
      action: "handleSubscriptionDeleted",
      errorType: "ValidationError",
    });
    throw error;
  }
}

async function handlePaymentSucceeded(event: Stripe.Event) {
  const invoice = event.data.object as StripeInvoice;
  const customerId = invoice.customer as string;
  const couponStripeId = invoice?.discount?.promotion_code as string;
  // const invoiceHasCoupon = invoice?.discount?.coupon;

  try {
    await updateSubscriptionInDatabase(customerId, invoice, "active");

    // if coupon applied to this payment (invoice has coupon) update/expire it in Database
    if (couponStripeId) {
      await updateCouponInDatabase(couponStripeId);
    }
  } catch (error) {
    logError(`Error handling payment succeeded: ${error}`, {
      action: "handlePaymentSucceeded",
      errorType: "ValidationError",
    });
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
      const err = "User not found for customer";
      logError(`${err}: ${customerId}`, {
        action: "handlePaymentFailed",
        errorType: "ValidationError",
      });
      throw new Error(err);
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
    logError(`Error handling payment failed: ${error}`, {
      action: "handlePaymentFailed",
      errorType: "ValidationError",
    });
    throw error;
  }
}
