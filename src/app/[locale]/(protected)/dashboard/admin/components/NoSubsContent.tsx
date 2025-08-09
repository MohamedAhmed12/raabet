"use client";

import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ShieldX } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export function NoSubsContent() {
  const t = useTranslations("Subscription");
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center m-auto self-center",
        fontClass
      )}
    >
      <ShieldX className="w-25 h-25 mb-4 text-slate-500" />
      <p className="text-center text-slate-500 font-semibold">
        {t("restricted")}
      </p>
    </div>
  );
}

export default NoSubsContent;
