"use client";

import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import { SidebarProvider } from "@/components/ui/sidebar";
import { logError } from "@/lib/errorHandling";
import { addDays, isBefore } from "date-fns";
import { useMemo, useState } from "react";
import { useShallow } from "zustand/shallow";
import CustomSidebar from "./components/CustomSidebar";
import { DashboardContainer } from "./components/DashboardContainer";
import FeedbackPopup from "./components/FeedbackPopup";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isManuallyOpened, setIsManuallyOpened] = useState(false);

  const { linkID, lastFeedbackTimestamp } =
    useLinkStore(
      useShallow((state) => {
        return {
          lastFeedbackTimestamp: state.link.last_feedback_ts,
          linkID: state.link.id,
        };
      })
    ) || "";

  const shouldShowFeedback = useMemo(() => {
    // If manually opened, always show
    if (isManuallyOpened) return true;
    // Automatic check logic
    if (!linkID || !lastFeedbackTimestamp) return false;

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
      return false; // On error, show feedback
    }
  }, [isManuallyOpened, linkID, lastFeedbackTimestamp]);

  const handleToggleFeedbackPopup = (open: boolean) => {
    setIsManuallyOpened(open);
  };

  return (
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
  );
}
