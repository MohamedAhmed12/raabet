import { useTranslations } from "next-intl";
import Link from "next/link";

export const UpgradePlanBanner = () => {
  const t = useTranslations();
  return (
    <div className="fixed z-2 flex items-center justify-center w-full h-[44px] font-semibold text-sm text-deep-blue-gray bg-light-orange border-b-1 border-[#303030] font-noto-sans">
      {t("ActivationBanner.firstHalf")}
      <div className=""></div>
      <Link href="/dashboard/admin/subscription" className="mx-1 underline font-bold">
        {t("Shared.subscribe")}
      </Link>
      {t("ActivationBanner.secondHalf")}
    </div>
  );
};
