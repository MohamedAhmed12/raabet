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
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CustomSidebar() {
  const locale = useLocale();
  const t = useTranslations("Sidebar");
  const pathname = usePathname();
  const {getOppositeLang, switchLocale} = useLocaleMeta();

  const sidebarTabs: {text: string; url: string; icon: iconNameType}[] = [
    {
      text: t("tabs.design"),
      url: "/dashboard/admin/profile/links",
      icon: "paintbrush",
    },
    {
      text: t("tabs.settings"),
      url: "/dashboard/admin/profile/settings",
      icon: "settings",
    },
    {
      text: t("tabs.analytics"),
      url: "/dashboard/admin/analytics/metrics",
      icon: "chart-no-axes-combined",
      // icon: "chart-line",
    },
    {
      text: t("tabs.subscribe"),
      url: "/dashboard/admin/subscription",
      icon: "lock-keyhole-open",
    },
  ];

  const isActive = (url: string) => pathname === url;

  return (
    <Sidebar
      className="font-noto-sans font-medium"
      side={locale === "ar" ? "right" : "left"}
    >
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
                <span>{t('tabs.logout')}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-[11px] font-noto-sans">
        <Link
          href="/dashboard/admin/subscription"
          className="flex cursor-pointer flex-col h-auto w- p-[11px] items-center text-center text-white bg-[linear-gradient(45deg,_#dd76ff,_#097cd4)] rounded-md"
        >
          <Icon name="lock" className="text-white" size={19} />
          <span className="text-sm font-normal">{t('activateProfile')}</span>
          <span className="text-sm font-medium">
          {t('tryFree')}<br /> {t('14days')}
          </span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
