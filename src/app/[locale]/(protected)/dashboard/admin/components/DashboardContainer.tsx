"use client";

import {usePathname} from "@/i18n/navigation";
import {cn} from "@/lib/cn";

export const DashboardContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex flex-col items-center font-noto-sans pt-[44px] w-full md:w-[calc(100%+(-66px))] m-0 md:mx-auto",
        pathname == "/dashboard/admin/profile/links" && "max-h-screen"
      )}
    >
      {children}
    </div>
  );
};
