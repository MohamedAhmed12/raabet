import CustomSidebar from "./components/CustomSidebar";
import { UpgradePlanBanner } from "./components/UpgradePlanBanner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <UpgradePlanBanner />
      <div className="font-noto-sans pt-[50px]">
        <CustomSidebar />
        <div className="test">{children}</div>
      </div>
    </div>
  );
}
