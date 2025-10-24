"use client";

import { useLinkStore } from "@/app/[locale]/store/use-link-store";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { logError } from "@/lib/errorHandling";
import { addDays, isBefore } from "date-fns";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
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
      {/* add sidebar inset for mobile view sidebar trigger */}
      <SidebarInset>
        <DashboardContainer>
          {/* mobile sidebar header */}
          <header className="flex w-full justify-between items-center px-4 h-11 shrink-0 items-center transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-transparent border-b border-deep-blue-gray md:!hidden">
            <Link href="/" className="flex items-center gap-1">
              <LinkIcon
                size={28}
                strokeWidth={3.5}
                fontWeight={800}
                className="text-[#1b97f5] me-0.5"
              />
            </Link>
            <SidebarTrigger className="-ml-1 hover:bg-sidebar hover:text-sidebar-accent-foreground" />
          </header>

          {children}
        </DashboardContainer>
      </SidebarInset>
      {shouldShowFeedback && (
        <FeedbackPopup
          onOpenFeedbackPopup={(event) => handleToggleFeedbackPopup(event)}
        />
      )}
    </SidebarProvider>
  );
}
