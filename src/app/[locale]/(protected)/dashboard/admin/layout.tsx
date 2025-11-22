"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { logError } from "@/lib/errorHandling";
import { Link as LinkIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useFetchLink from "../../../[username]/useFetchLink";
import CustomSidebar from "./components/CustomSidebar";
import { DashboardContainer } from "./components/DashboardContainer";
import DashboardNotFound from "./not-found";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = useSession();
  const pathname = usePathname();

  // @ts-expect-error: [to access user data in session it exists in id]
  const userId = session?.data?.user?.id?.id as string;
  const { error } = useFetchLink({ userId });

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
    <SidebarProvider className="bg-gray-100">
      <CustomSidebar />
      {/* add sidebar inset for mobile view sidebar trigger */}
      <SidebarInset className="overflow-scroll">
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
    </SidebarProvider>
  );
}
