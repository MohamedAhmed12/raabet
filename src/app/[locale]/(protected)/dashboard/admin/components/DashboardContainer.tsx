"use client";

import useFetchLink from "@/app/[locale]/[username]/useFetchLink";
import Loading from "@/app/loading";
import { cn } from "@/lib/cn";
import { getFontClassClient } from "@/lib/fonts";
import { SubscriptionStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import NoSubsContent from "../components/NoSubsContent";
import SubscriptionBanner from "../components/SubscriptionBanner";
import DashboardNotFound from "../not-found";
import { useSubscriptionStatus } from "../subscription/callback/useSubscriptionStatus";
import { problemStatuses } from "../subscription/types/subscripiton";
import { logError } from "@/lib/errorHandling";

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

  // @ts-expect-error: [to access user data in session it exists in id]
  const userId = session?.data?.user?.id?.id as string;
  const { isLoading: isLoadingLink, error } = useFetchLink({ userId });
  const { data: status, isLoading: isLoadingSubs } = useSubscriptionStatus({
    email: session?.data?.user?.email as string,
  });

  if (error) {
    logError(error as unknown, {
      action: "dashboard/container",
      path: pathname,
      userId: userId || "undefined",
      timestamp: new Date().toISOString(),
    });
    return <DashboardNotFound />;
  }

  return (
    <div className="flex flex-col w-full">
      {isLoadingSubs || isLoadingLink || !status ? (
        <Loading />
      ) : (
        <>
          <SubscriptionBanner status={status} />

          {/* Show subscription banner and no subscription content if user is not subscribed */}
          {problemStatuses.includes(status as SubscriptionStatus) &&
          !isSubscriptionPage ? (
            <NoSubsContent />
          ) : (
            <div
              className={cn(
                "flex flex-col items-center w-full m-0 overflow-auto",
                fontClass
                // pathname === "/dashboard/admin/profile/links"
                // ? "max-h-screen"
                // : "flex-1 md:mx-auto md:w-[calc(100%+(-66px))]"
              )}
            >
              {children}
            </div>
          )}
        </>
      )}
    </div>
  );
};
