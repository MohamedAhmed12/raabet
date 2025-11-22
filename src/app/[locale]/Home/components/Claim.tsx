"use client";

import { Input } from "@/components/ui/input";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { LinkIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export const Claim = () => {
  const t = useTranslations();
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);

  return (
    <div
      dir="ltr"
      className={`flex items-center rounded-[100px] border border-[#1d1d28] shadow-[3px_3px_0px_#1d1d28] bg-white cursor-text p-2 mt-8 ${fontClass} font-semibold`}
    >
      <LinkIcon
        size={25}
        strokeWidth={3}
        fontWeight={800}
        className="mx-2 text-[#1b97f5] min-w-max"
      />
      <span className="text-lg mr-[2px]">rabetlink.com/</span>
      <Input
        type="text"
        placeholder="name"
        className={cn(
          "bg-none border-none shadow-none pl-0",
          "focus:ring-0 focus:rounded-none focus:outline-none",
          "focus-visible:ring-0 focus-visible:rounded-none focus-visible:outline-none"
        )}
      />

      <Link
        href="/auth/sign-up"
        className={cn(
          "bg-deep-blue-gray text-white px-6 py-3 rounded-4xl font-bold min-w-max"
        )}
      >
        {t("Shared.claim")}
      </Link>
    </div>
  );
};
