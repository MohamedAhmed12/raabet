"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import CustomSidebar from "./components/CustomSidebar";
import { DashboardContainer } from "./components/DashboardContainer";
import { UpgradePlanBanner } from "./components/UpgradePlanBanner";
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <SidebarProvider className="bg-gray-100">
        <CustomSidebar />
        <UpgradePlanBanner />
        <DashboardContainer>{children}</DashboardContainer>
      </SidebarProvider>
    </SessionProvider>
  );
}
