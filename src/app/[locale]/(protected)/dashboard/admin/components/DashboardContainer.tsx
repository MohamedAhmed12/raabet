"use client";

import { usePathname } from "@/i18n/navigation";
import { useSession } from "next-auth/react";
import { useSubscriptionStatus } from "../subscription/callback/useSubscriptionStatus";
import { cn } from "@/lib/cn";
import NoSubsContent from "../components/NoSubsContent";
import SubscriptionBanner from "../components/SubscriptionBanner";
import { SubscriptionStatus } from "@prisma/client";
import { problemStatuses } from "../subscription/types/subscripiton";
import Loading from "@/app/loading";
import useFetchLink from "@/app/[locale]/[username]/useFetchLink";
import DashboardNotFound from "../not-found";

export const DashboardContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const session = useSession();

  // @ts-expect-error: [to access user data in session it exists in id]
  const userId = session?.data?.user?.id?.id as string;
  const { isLoading: isLoadingLink, error } = useFetchLink({ userId });
  const { status, isLoading: isLoadingSubs } = useSubscriptionStatus({
    email: session?.data?.user?.email as string,
  });

  if (error) return <DashboardNotFound />;

  return (
    <div className="flex flex-col w-full">
      {isLoadingSubs || isLoadingLink || !status ? (
        <Loading />
      ) : (
        <>
          <SubscriptionBanner status={status} />

          {/* Show subscription banner and no subscription content if user is not subscribed */}
          {problemStatuses.includes(status as SubscriptionStatus) &&
          ![
            "/dashboard/admin/subscription",
            "/dashboard/admin/subscription/callback",
          ].includes(pathname) ? (
            <NoSubsContent />
          ) : (
            <div
              className={cn(
                "flex flex-col items-center font-noto-sans w-full m-0",
                pathname === "/dashboard/admin/profile/links"
                  ? "max-h-screen"
                  : "flex-1 md:mx-auto md:w-[calc(100%+(-66px))] "
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
