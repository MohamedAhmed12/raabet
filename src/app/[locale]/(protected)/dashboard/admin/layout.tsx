"use client";

import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { SidebarProvider } from "@/components/ui/sidebar";
import { addDays, isBefore } from "date-fns";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import CustomSidebar from "./components/CustomSidebar";
import { DashboardContainer } from "./components/DashboardContainer";
import FeedbackPopup from "./components/FeedbackPopup";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isFeedbackPopupOpen, setIsFeedbackPopupOpen] = useState(false);

  const lastFeedbackTimestamp = useLinkStore(
    (state) => state.link.last_feedback_ts
  );

  // Check if last feedback was more than 14 days ago or never given
  useEffect(() => {
    // cuz lastFeedbackTimestamp always have timestamp as it's same as created_at for link
    if (!lastFeedbackTimestamp) return;

    const fourteenDaysAgo = addDays(new Date(), -14);
    const isBefore14Days = isBefore(
      new Date(lastFeedbackTimestamp),
      fourteenDaysAgo
    );
    if (isBefore14Days) setIsFeedbackPopupOpen(true);
  }, [lastFeedbackTimestamp, setIsFeedbackPopupOpen]);

  const handleToggleFeedbackPopup = (open: boolean) => {
    setIsFeedbackPopupOpen(open);
  };

  return (
    <SessionProvider>
      <SidebarProvider className="bg-gray-100">
        <CustomSidebar
          onOpenFeedbackPopup={() => handleToggleFeedbackPopup(true)}
        />
        <DashboardContainer>{children}</DashboardContainer>
        {isFeedbackPopupOpen && (
          <FeedbackPopup
            onOpenFeedbackPopup={(event) => handleToggleFeedbackPopup(event)}
          />
        )}
      </SidebarProvider>
    </SessionProvider>
  );
}
