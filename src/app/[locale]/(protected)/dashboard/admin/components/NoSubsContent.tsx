"use client";

import { ShieldX } from "lucide-react";
import { useTranslations } from "next-intl";

export function NoSubsContent() {
  const t = useTranslations("Subscription");

  return (
    <div className="flex flex-col items-center justify-center m-auto self-center font-noto-sans">
      <ShieldX className="w-25 h-25 mb-4 text-slate-500" />
      <p className="text-center text-slate-500 font-semibold">
        {t("restricted")}
      </p>
    </div>
  );
}

export default NoSubsContent;
