import { SidebarProvider } from "@/components/ui/sidebar";
import CustomSidebar from "./components/CustomSidebar";
import { DashboardContainer } from "./components/DashboardContainer";
import { UpgradePlanBanner } from "./components/UpgradePlanBanner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="bg-gray-100">
      <CustomSidebar/>
        <UpgradePlanBanner />
        <DashboardContainer>{children}</DashboardContainer>
    </SidebarProvider>
  );
}
