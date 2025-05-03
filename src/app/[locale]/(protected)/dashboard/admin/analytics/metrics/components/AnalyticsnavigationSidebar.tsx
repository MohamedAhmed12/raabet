import { iconNameType } from "@/assets/icons";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import Link from "next/link";
import { Toggle } from "@/components/ui/toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/ui/badge";

const analyticsSidebarTabs: {
  text: string;
  value: string;
  icon: iconNameType;
}[] = [
  {
    text: "profile metrics",
    value: "profile_metrics",
    // url: "dashboard/admin/analytics/metrics",
    icon: "chart-spline",
  },
  // {
  //   text: "subscribers",
  //   value: "subscribers",
  //   // url: "dashboard/admin/analytics/metrics",
  //   icon: "user",
  // },
];
// export default function AnalyticsnavigationSidebar({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <Tabs defaultValue="account"
//     // className="flex lg:flex-col w-full mx-[-25%]"
//      >
//       <TabsList
//         aria-label="Responsive Tabs"
//         className={cn(
//           // "flex lg:flex-col w-full h-full justify-center items-center space-x-3 lg:space-x-0 lg:space-y-3  bg-white py-[22px] px-[11px] rounded-none"
//         )}
//       >
//         {analyticsSidebarTabs.map((tab) => (
//           <TabsTrigger
//             key={tab.text}
//             value={tab.value}
//             // className="flex flex-col p-[11px] w-full max-h-fit text-md font-normal data-[state=active]:bg-zinc-100 capitalize cursor-pointer border-[#d3d3d3]"
//           >
//             <Icon name={tab.icon} />
//             {tab.text}
//           </TabsTrigger>
//         ))}
//       </TabsList>
//       <TabsContent value="account">
//         Make changes to your account here.
//       </TabsContent>
//       <TabsContent value="password">Change your password here.</TabsContent>
//     </Tabs>
//     // <Tabs className="flex bg-white absolute left-[150px] top-[px] max-h-full h-full w-[180px]">
//     //   <TabsList className="flex flex lg:flex-col w-full h-full justify-start space-y-3 bg-white py-[22px] px-[11px] rounded-none">
//     //     {analyticsSidebarTabs.map((tab) => (
//     //       <TabsTrigger
//     //       key={tab.text}
//     //       value={tab.value}
//     //         className="flex flex-col p-[11px] w-full max-h-fit text-md font-normal data-[state=active]:bg-zinc-100 capitalize cursor-pointer border-[#d3d3d3]"
//     //       >
//     //         <Icon name={tab.icon} />
//     //         {tab.text}
//     //       </TabsTrigger>
//     //     ))}
//     //   </TabsList>
//     // </Tabs>
//   );
// }

export default function AnalyticsnavigationSidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Tabs defaultValue={analyticsSidebarTabs[0].value} className="mt-6">
      {/* <TabsList className="grid w-full grid-cols-2  bg-slate-200 border-1 border-slate-200"  > */}
      {analyticsSidebarTabs.map((tab) => (
        // <TabsTrigger
        //   key={tab.text}
        //   value={tab.value}
        //   className="cursor-pointer"
        // >
        //   <Icon name={tab.icon} />
        //   {tab.text}
        // </TabsTrigger>
        <Badge
          key={tab.text}
          variant="outline"
          className="bg-white w-[200px] h-[50px] p-[11px] text-md font-normal capitalize border-[#d3d3d3]"
        >
          <Icon name={tab.icon} sizeClass="sm" className="mr-1" />
          {tab.text}
        </Badge>
      ))}
      {/* </TabsList> */}
      {analyticsSidebarTabs.map((tab) => (
        <TabsContent key={`content-${tab.text}`} value={tab.value}>{children}</TabsContent>
      ))}
    </Tabs>
  );
}
