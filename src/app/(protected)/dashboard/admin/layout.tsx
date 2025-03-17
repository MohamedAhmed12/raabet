import { redirect } from "next/navigation";
import CustomSidebar from "./components/CustomSidebar";
import { UpgradePlanBanner } from "./components/UpgradePlanBanner";
import { authOptions } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await authOptions.auth();
  if(!session) redirect("/login");

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
