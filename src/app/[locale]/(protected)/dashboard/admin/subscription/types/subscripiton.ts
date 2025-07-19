import { SubscriptionStatus } from "@prisma/client";

export const problemStatuses: SubscriptionStatus[] = [
  "none",
  "failed",
  "canceled",
];
