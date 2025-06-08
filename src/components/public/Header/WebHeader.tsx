"use client";

import { useTranslations } from "next-intl";
import NextLink from "next/link";

export const WebHeader = () => {
  const t = useTranslations();

  return (
    <NextLink href="/auth/login" className="mt-[3px] hidden lg:block">
      {t("Shared.login")}
    </NextLink>
  );
};
