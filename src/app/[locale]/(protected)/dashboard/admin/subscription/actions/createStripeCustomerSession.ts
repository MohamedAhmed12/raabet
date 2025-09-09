"use server";

import { authOptions } from "@/lib/auth";
import { logError } from "@/lib/errorHandling";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export async function createStripeCustomerSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    const err = `Unauthorized`;
    logError(err, {
      action: "createStripeCustomerSession",
      errorType: "ValidationError",
    });
    throw new Error(err);
  }

  // Fetch user and their subscription from DB
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    const err = `User not found`;
    logError(err, {
      action: "createStripeCustomerSession",
      errorType: "ValidationError",
    });
    throw new Error(err);
  }

  // Get the user's stripeCustomerId
  let stripeCustomerId = user.stripeCustomerId;
  // Create stripe customer if doesn't exist in our database
  if (!stripeCustomerId) {
    try {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.fullname || undefined,
      });

      // Update user with customer ID
      await prisma.user.update({
        where: { id: user.id },
        data: {
          stripeCustomerId: customer.id,
        },
      });

      stripeCustomerId = customer.id;
    } catch (error) {
      const err = `Create stripe customer failed:${error}`;
      logError(err, {
        action: "createStripeCustomerSession",
        errorType: "ValidationError",
      });
      throw new Error(err);
    }
  }

  // Create stripe customer session
  const customerSession = await stripe.customerSessions.create({
    customer: stripeCustomerId,
    components: {
      pricing_table: { enabled: true },
    },
  });

  return {
    clientSecret: customerSession.client_secret,
    user,
  };
}
