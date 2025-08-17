"use client";

import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useSubscriptionStatus } from "./callback/useSubscriptionStatus";
import SubscriptionForm from "./SubscriptionForm";
import SubscriptionStatusCard from "./SubscriptionStatusCard";
import { problemStatuses } from "./types/subscripiton";

export default function SubscriptionPage() {
  const session = useSession();

  const {
    data: status,
    isLoading,
    refetch,
  } = useSubscriptionStatus({
    email: session?.data?.user?.email || "",
  });

  const showSubscriptionForm = status && problemStatuses.includes(status);
  const showSubscriptionStatusCard =
    status && !problemStatuses.includes(status);

  return (
    <>
      <script async src="/js/stripe.js"></script>
      <div className={cn("flex-1 w-full")}>
        {isLoading ? (
          <div className="flex h-full min-h-screen justify-center items-center">
            <LoaderCircle className="animate-spin" size={45} />
          </div>
        ) : (
          <div className="py-10">
            {showSubscriptionStatusCard && (
              <SubscriptionStatusCard status={status} />
            )}
            {showSubscriptionForm && <SubscriptionForm refetch={refetch} />}
          </div>
        )}
      </div>
    </>
  );
}
