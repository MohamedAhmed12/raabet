"use client";

import { Link } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

export const Header = () => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <header className="flex items-center justify-between h-16 px-8 fixed w-full z-[50] bg-white border-b border-deep-blue-gray font-noto-sans font-medium min-h-[70px]">
      <div className="flex items-center justify-center">
        <NextLink
          href="/"
          className={cn("flex items-center", locale === "ar" ? "pl-6" : "pr-6")}
        >
          <Link
            size={22}
            width={22}
            strokeWidth={3}
            fontWeight={800}
            className={cn("text-[#1b97f5]", locale === "ar" ? "ml-2" : "mr-2")}
          />
          <span className="text-2xl font-bold text-deep-blue-gray capitalize">
            {t("Shared.rabet")}
          </span>
        </NextLink>
        <NextLink href="/pricing" className="mt-[3px]">
          {t("Header.pricing")}
        </NextLink>
      </div>

      <div className="flex gap-5 items-center justify-between">
        <NextLink href="/auth/login" className="mt-[3px]">
          {t("Shared.login")}
        </NextLink>

        <button className="bg-deep-blue-gray text-white px-6 py-4 rounded-4xl font-bold leading-none">
          <NextLink href="/auth/sign-up">{t("Shared.signup")}</NextLink>
        </button>
      </div>
    </header>
  );
};
