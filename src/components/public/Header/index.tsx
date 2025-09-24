"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import NextLink from "next/link";
import { LanguageSwitch } from "../LanguageSwitch";
import { MobileHeader } from "./MobileHeader";
import { RabetAvatar } from "./RabetAvatar";
import { WebHeader } from "./WebHeader";

export const Header = () => {
  const t = useTranslations();
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);

  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <header
      className={cn(
        "flex items-center justify-between w-full h-16 fixed z-[50] bg-white border-b border-deep-blue-gray px-4",
        "lg:px-8",
        fontClass
      )}
    >
      <div className="flex items-center">
        <NextLink href="/" className="flex items-center gap-1">
          <Link
            size={21}
            width={21}
            strokeWidth={3.5}
            fontWeight={800}
            className="text-[#1b97f5]"
          />
          <span
            className={cn(
              "font-bold text-deep-blue-gray capitalize",
              locale === "ar" ? "text-3xl" : "text-2xl"
            )}
          >
            {t("Shared.rabet")}
          </span>
        </NextLink>
        <NextLink href="/pricing" className="mt-[3px] hidden lg:block ms-4">
          {t("Shared.pricing")}
        </NextLink>
        <NextLink href="/contact" className="mt-[3px] hidden lg:block ms-4">
          {`${t("Contact.contact")} ${t("Contact.us")}`}
        </NextLink>
        <NextLink href="/blog" className="mt-[3px] hidden lg:block ms-4">
          {t("Blog.blog")}
        </NextLink>
      </div>

      {isLoading ? (
        <div className="flex gap-4 items-center">
          <Skeleton className="h-8 w-15 rounded-full" />
          <Skeleton className="h-10 w-25 rounded-full" />
        </div>
      ) : (
        <div
          className={cn("flex gap-2.5 items-center justify-center", "lg:gap-4")}
        >
          <LanguageSwitch />
          {session ? (
            <RabetAvatar />
          ) : (
            <>
              <WebHeader />
              <button
                className={cn(
                  "bg-deep-blue-gray text-white px-4.5 py-3 rounded-4xl font-bold leading-none",
                  "lg:px-6 lg:py-4"
                )}
              >
                <NextLink href="/auth/sign-up">{t("Shared.signup")}</NextLink>
              </button>
              <MobileHeader />
            </>
          )}
        </div>
      )}
    </header>
  );
};
