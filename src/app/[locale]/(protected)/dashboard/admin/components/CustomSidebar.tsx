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
import { signOut } from "next-auth/react"; // Import signOut from NextAuth.js
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarTabs: {text: string; url: string; icon: iconNameType}[] = [
  {
    text: "design",
    url: "/dashboard/admin/profile/links",
    icon: "paintbrush",
  },
  {
    text: "settings",
    url: "/dashboard/admin/profile/settings",
    icon: "settings",
  },
  {
    text: "analytics",
    url: "/dashboard/admin/analytics/metrics",
    icon: "chart-no-axes-combined",
    // icon: "chart-line",
  },
  // next release
  // {
  //   text: "QR codes",
  //   url: "qr-code",
  //   icon: "qr-code",
  //   // icon: "scan-line",
  // },
  // {
  //   text: "AI chat",
  //   url: "ai-chat",
  //   icon: "sparkle",
  //   // icon: "sparkles",
  // },
  {
    text: "subscripe",
    url: "subscripe",
    icon: "lock-keyhole-open",
  },
];

export default function CustomSidebar() {
  const pathname = usePathname();
  const {getOppositeLang, switchLocale} = useLocaleMeta();

  const isActive = (url: string) => pathname === url;
  return (
    <Sidebar className="font-noto-sans font-medium">
      <SidebarContent className="p-[11px] pt-[55px]">
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
              className="flex gap-2 p-[5.5px] mb-[6px] rounded-sm "
              variant="dashboardDefault"
              isActive={isActive("logout")}
              onClick={() => signOut({callbackUrl: "/auth/login"})}
            >
              <Link href={"logout"} className="flex gap-2 p-[5.5px] rounded-sm">
                <Icon name={"log-out"} size={20} />
                <span>logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-[11px] font-noto-sans">
        <Link
          href="/dashboard/admin/subscripe"
          className="flex cursor-pointer flex-col h-auto w- p-[11px] items-center justify- text-white bg-[linear-gradient(45deg,_#dd76ff,_#097cd4)] rounded-md"
        >
          <Icon name="lock" className="text-white" size={19} />
          <span className="text-sm font-normal">Activate profile</span>
          <span className="text-sm font-medium">
            Try free <br /> for 14 days
          </span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
