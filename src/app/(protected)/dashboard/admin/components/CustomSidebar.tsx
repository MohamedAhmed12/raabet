import { iconNameType } from "@/assets/icons";
import { Icon } from "@/components/Icon";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarFooter,
} from "@/components/ui/sidebar";

const sidebarTabs: { text: string; icon: iconNameType }[] = [
  {
    text: "design",
    icon: "paintbrush",
  },
  {
    text: "settings",
    icon: "settings",
  },
  {
    text: "analytics",
    icon: "chart-no-axes-combined",
    // icon: "chart-line",
  },
  {
    text: "QR codes",
    icon: "chart-line",
    // icon: "scan-line",
  },
  {
    text: "AI chat",
    icon: "sparkle",
    // icon: "sparkles",
  },
  {
    text: "subscripe",
    icon: "lock-keyhole-open",
  },
  {
    text: "log out",
    icon: "log-out",
  },
];
export default function CustomSidebar() {
  return (
    <SidebarProvider className="">
      <Sidebar className="font-noto-sans font-medium">
        <SidebarContent className="p-[11px] pt-[55px]">
          <SidebarMenu className="capitalize text-sm font-bold">
            {sidebarTabs.map((tab, index) => (
              <SidebarMenuItem key={index} className="flex gap-2 p-[5.5px] mb-[6px]">
                <Icon name={tab.icon} size={20} />
                <span>{tab.text}</span>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </SidebarProvider>
  );
}
