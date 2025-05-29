"use server";

import Stripe from "stripe";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export async function createStripeCustomerSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  // Fetch user and their subscription from DB
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { subscriptions: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Get the user's stripeCustomerId
  let stripeCustomerId = user.stripeCustomerId;

  // Create stripe customer if doesn't exist in our database
  if (!stripeCustomerId) {
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
  };
}
