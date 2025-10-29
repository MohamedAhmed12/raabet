"use client";

import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function Providers({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider
      session={session}
      refetchInterval={0} // Disable automatic refetching
      refetchOnWindowFocus={false} // Prevent refetch on window focus
      refetchWhenOffline={false} // Don't refetch when offline
    >
      <ReactQueryProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
