"use client";

import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { MobileHeader } from "./MobileHeader";
import { WebHeader } from "./WebHeader";
import { useLocale } from "next-intl";

export const Header = () => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <header
      className={cn(
        "flex items-center justify-between w-full h-16 fixed z-[50] bg-white border-b border-deep-blue-gray font-noto-sans px-4",
        "lg:px-8"
      )}
    >
      <div className="flex items-center">
        <NextLink href="/" className="flex items-center">
          <span className="text-2xl font-bold text-deep-blue-gray capitalize">
            {t("Shared.rabet")}
          </span>
        </NextLink>
        <NextLink
          href="/pricing"
          className={cn("mt-[3px]", locale === "ar" ? "mr-4" : "ml-4")}
        >
          {t("Header.pricing")}
        </NextLink>
      </div>

      <WebHeader />
      <MobileHeader />
    </header>
  );
};
