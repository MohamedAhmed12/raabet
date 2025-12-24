"use client";

import { cn } from "@/lib/cn";
import { getFontClassClient } from "@/lib/fonts";
import { SubscriptionStatus } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import NoSubsContent from "../components/NoSubsContent";
import SubscriptionBanner from "../components/SubscriptionBanner";
import { problemStatuses } from "../subscription/types/subscripiton";

export const DashboardContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const locale = useLocale();
  const session = useSession();
  const pathname = usePathname();
  const fontClass = getFontClassClient(locale);
  const isSubscriptionPage = pathname.includes("/subscription");

  // Subscribe to subscription status updates (reactive)
  const userEmail = session?.data?.user?.email as string;
  const { data: status } = useQuery<SubscriptionStatus>({
    queryKey: ["subscriptionStatus", { email: userEmail }],
    enabled: false, // Don't fetch - just subscribe to cache updates
  });

  return (
    <div className="flex flex-col w-full h-full">
      <SubscriptionBanner status={status} />

      {/* Show subscription banner and no subscription content if user is not subscribed */}
      {status && problemStatuses.includes(status as SubscriptionStatus) &&
      !isSubscriptionPage ? (
        <NoSubsContent />
      ) : (
        <div
          className={cn(
            "flex flex-col items-center w-full m-0 overflow-auto",
            fontClass
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};
