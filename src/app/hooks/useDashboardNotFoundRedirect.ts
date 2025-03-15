import { redirect, usePathname } from "next/navigation";

export const useDashboardNotFoundRedirect = () => {
  const pathname = usePathname();

  if (pathname.includes("dashboard")) {
    redirect("/dashboard/admin/profile/settings");
  }
};
