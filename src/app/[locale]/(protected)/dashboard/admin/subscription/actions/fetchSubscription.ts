"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import {Subscription} from "@prisma/client";


const prisma = new PrismaClient();

export async function fetchSubscription(): Promise<Subscription | null> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      subscriptions: true,
    },
  });

  if (!user?.subscriptions || user.subscriptions.length === 0) {
    return null;
  }

  const activeSubscription = user.subscriptions.find(
    (sub: Subscription) => sub.status === 'active'
  );

  return activeSubscription || user.subscriptions[0];
}
