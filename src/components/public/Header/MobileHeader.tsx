"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import NextLink from "next/link";

export const MobileHeader = () => {
  const t = useTranslations();
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);
  const pathname = usePathname();

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <button className="lg:hidden p-2 rounded-full text-white bg-deep-blue-gray focus:outline-none cursor-pointer">
          <Menu className="w-6 h-6" />
        </button>
      </DrawerTrigger>
      <DrawerContent className={cn("bg-white", fontClass)}>
        <DrawerHeader className="hidden">
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div className="p-6 text-center">
          <div className="flex flex-col gap-4">
            <NextLink
              href="/"
              className={`text-gray-600 hover:text-deep-blue-gray transition-colors ${
                pathname === "/" ? "text-deep-blue-gray font-semibold" : ""
              }`}
            >
              {t("Header.home")}
            </NextLink>

            <NextLink
              href="/pricing"
              className={`text-gray-600 hover:text-deep-blue-gray transition-colors ${
                pathname === "/pricing"
                  ? "text-deep-blue-gray font-semibold"
                  : ""
              }`}
            >
              {t("Shared.pricing")}
            </NextLink>

            <NextLink
              href="/auth/login"
              className="text-gray-600 hover:text-deep-blue-gray transition-colors"
            >
              {t("Shared.login")}
            </NextLink>
          </div>
          <div className="mt-7 flex flex-col gap-4">
            <button className="w-full bg-deep-blue-gray text-white px-6 py-4 rounded-4xl font-bold leading-none">
              <NextLink href="/auth/sign-up">{t("Shared.signup")}</NextLink>
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
