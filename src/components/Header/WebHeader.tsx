"use client";

import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

export const WebHeader = () => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="hidden lg:block flex gap-5 items-center">
      <NextLink
        href="/auth/login"
        className={cn("mt-[3px]", locale === "ar" ? "ml-4" : "mr-4")}
      >
        {t("Shared.login")}
      </NextLink>

      <button className="bg-deep-blue-gray text-white px-6 py-4 rounded-4xl font-bold leading-none">
        <NextLink href="/auth/sign-up">{t("Shared.signup")}</NextLink>
      </button>
    </div>
  );
};
