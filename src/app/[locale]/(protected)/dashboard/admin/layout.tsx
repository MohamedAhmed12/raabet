"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";
import CustomSidebar from "./components/CustomSidebar";
import { DashboardContainer } from "./components/DashboardContainer";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <SidebarProvider className="bg-gray-100">
        <CustomSidebar />
        <DashboardContainer>{children}</DashboardContainer>
      </SidebarProvider>
    </SessionProvider>
  );
}
