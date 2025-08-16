"use client";

import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { SidebarProvider } from "@/components/ui/sidebar";
import { addDays, isBefore } from "date-fns";
import { SessionProvider } from "next-auth/react";
import { useMemo, useState } from "react";
import CustomSidebar from "./components/CustomSidebar";
import { DashboardContainer } from "./components/DashboardContainer";
import FeedbackPopup from "./components/FeedbackPopup";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isManuallyOpened, setIsManuallyOpened] = useState(false);

  const lastFeedbackTimestamp =
    useLinkStore((state) => state.link.last_feedback_ts) || "";

  const shouldShowFeedback = useMemo(() => {
    // If manually opened, always show
    if (isManuallyOpened) return true;

    // Automatic check logic
    if (!lastFeedbackTimestamp) return true;

    try {
      const feedbackDate = new Date(lastFeedbackTimestamp);
      if (isNaN(feedbackDate.getTime())) return true; // Invalid date, show feedback

      const fourteenDaysAgo = addDays(new Date(), -14);
      return isBefore(feedbackDate, fourteenDaysAgo);
    } catch {
      return true; // On error, show feedback
    }
  }, [lastFeedbackTimestamp, isManuallyOpened]);

  const handleToggleFeedbackPopup = (open: boolean) => {
    setIsManuallyOpened(open);
  };

  return (
    <SessionProvider>
      <SidebarProvider className="bg-gray-100">
        <CustomSidebar
          onOpenFeedbackPopup={() => handleToggleFeedbackPopup(true)}
        />
        <DashboardContainer>{children}</DashboardContainer>
        {shouldShowFeedback && (
          <FeedbackPopup
            onOpenFeedbackPopup={(event) => handleToggleFeedbackPopup(event)}
          />
        )}
      </SidebarProvider>
    </SessionProvider>
  );
}
