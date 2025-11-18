"use client";

import { iconNameType } from "@/assets/icons";
import { Icon } from "@/components/Icon";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocaleMeta } from "@/hooks/use-locale-meta";
import { usePathname } from "@/i18n/navigation";
import { logError } from "@/lib/errorHandling";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Link as PrismaLink, SubscriptionStatus } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { addDays, isBefore } from "date-fns";
import { Award, CirclePlus } from "lucide-react";
import { signOut, useSession } from "next-auth/react"; // Import signOut from NextAuth.js
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useSubscriptionStatus } from "../subscription/callback/useSubscriptionStatus";
import FeedbackPopup from "./FeedbackPopup";

export default function CustomSidebar() {
  const [manuallyOpen, setManuallyOpen] = useState(false);

  const t = useTranslations("Sidebar");
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);
  const session = useSession();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { getOppositeLang, switchLocale } = useLocaleMeta();

  const sidebarTabs: { text: string; url: string; icon: iconNameType }[] = [
    {
      text: t("tabs.design"),
      url: "/dashboard/admin/profile/links",
      icon: "paintbrush",
    },
    {
      text: t("tabs.settings"),
      url: "/dashboard/admin/profile/settings",
      icon: "settings",
    },
    {
      text: t("tabs.analytics"),
      url: "/dashboard/admin/analytics/metrics",
      icon: "chart-no-axes-combined",
      // icon: "chart-line",
    },
    {
      text: t("tabs.subscribe"),
      url: "/dashboard/admin/subscription",
      icon: "lock-keyhole-open",
    },
    {
      text: t("tabs.qr"),
      url: "/dashboard/admin/qr-codes",
      icon: "qr-code",
    },
  ];

  // @ts-expect-error: [to access user data in session it exists in id]
  const user = session?.data?.user?.id;
  const userId = user?.id as string;

  // Get data from React Query cache - must match useFetchLink query key exactly
  const cachedLinkData = queryClient.getQueryData<PrismaLink>([
    "link",
    { userId, username: undefined },
  ]);
  const linkId = cachedLinkData?.id as string;
  const lastFeedbackTimestamp = cachedLinkData?.last_feedback_ts as Date;

  const { data: subscriptionStatus } = useSubscriptionStatus({
    email: user?.email as string,
  });

  const shouldShowAutomatically = useMemo(() => {
    if (!linkId || !lastFeedbackTimestamp) return false;

    try {
      const feedbackDate = new Date(lastFeedbackTimestamp);
      if (isNaN(feedbackDate.getTime())) return true; // Invalid date, show feedback

      const fourteenDaysAgo = addDays(new Date(), -14);
      return isBefore(feedbackDate, fourteenDaysAgo);
    } catch (err) {
      logError(err, {
        action: "shouldShowFeedback",
        errorType: "UnknownError",
      });
      return false;
    }
  }, [linkId, lastFeedbackTimestamp]);

  const shouldBeOpen = manuallyOpen || shouldShowAutomatically;

  const handleOpenFeedback = () => {
    setManuallyOpen(true);
  };

  const isActive = (url: string) => pathname === url;

  return (
    <Sidebar
      className={cn("font-medium", fontClass)}
      side={locale === "ar" ? "right" : "left"}
    >
      <SidebarContent className="p-[11px] pt-[30px]">
        <SidebarMenu className="capitalize text-sm font-bold">
          {/* tabs  */}
          {sidebarTabs.map((tab, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton
                className="flex gap-2 p-[5.5px] mb-[6px] rounded-sm "
                variant="dashboardDefault"
                isActive={isActive(tab.url)}
              >
                <Link
                  href={tab.url} // Corrected href format
                  className="flex gap-2 p-[5.5px] rounded-sm"
                >
                  <Icon name={tab.icon} size={20} />
                  <span>{tab.text}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          {/* feedback tabs  */}
          <SidebarMenuItem>
            <SidebarMenuButton
              className="h-11 flex gap-2 p-[11px] mb-[6px] rounded-sm cursor-pointer break-words !leading-[1.25] text-[14px]"
              variant="dashboardDefault"
              isActive={false}
              onClick={handleOpenFeedback}
            >
              <CirclePlus size={20} className="min-w-[20px] min-h-[20px]" />
              {t("tabs.requestFeature")}
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              className="flex gap-2 p-[11px] mb-[6px] rounded-sm cursor-pointer"
              variant="dashboardDefault"
              isActive={false}
              onClick={handleOpenFeedback}
            >
              <Award size={20} className="min-w-[20px] min-h-[20px]" />
              <span>{t("tabs.rewards")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* localization tab */}
          <SidebarMenuItem>
            <SidebarMenuButton
              className="flex gap-2 p-[11px] mb-[6px] rounded-sm cursor-pointer"
              variant="dashboardDefault"
              isActive={false}
              onClick={() => switchLocale()}
            >
              <Icon name={getOppositeLang.code as iconNameType} size={20} />
              <span>{getOppositeLang.label}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* logout tab */}
          <SidebarMenuItem>
            <SidebarMenuButton
              className="flex gap-2 p-[11px] mb-[6px] rounded-sm cursor-pointer"
              variant="dashboardDefault"
              isActive={isActive("logout")}
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
            >
              <Icon name={"log-out"} size={20} />
              <span className="text-xs">{t("tabs.logout")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      {subscriptionStatus !== SubscriptionStatus.active && (
        <SidebarFooter className={cn("p-[11px]", fontClass)}>
          <Link
            href="/dashboard/admin/subscription"
            className="flex cursor-pointer flex-col h-auto w- p-[11px] items-center text-center text-white bg-[linear-gradient(45deg,_#dd76ff,_#097cd4)] rounded-md"
          >
            <Icon name="lock" className="text-white" size={19} />
            <span className="text-sm font-normal">{t("activateProfile")}</span>
            <span className="text-sm font-medium">
              {t("tryFree")}
              <br /> {t("14days")}
            </span>
          </Link>
        </SidebarFooter>
      )}
      <FeedbackPopup
        shouldBeOpen={shouldBeOpen}
        setManuallyOpen={setManuallyOpen}
      />
    </Sidebar>
  );
}
