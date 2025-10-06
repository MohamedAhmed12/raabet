"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "@/i18n/navigation";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import NextLink from "next/link";

export const MobileHeader = () => {
  const t = useTranslations();
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <button className="lg:hidden flex justify-center items-center h-8.5 w-8.5 p-1.5 rounded-full text-white bg-deep-blue-gray focus:outline-none cursor-pointer">
          <Menu className="w-5 h-5" />
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

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="free-tools" className="border-none">
                <AccordionTrigger className="text-gray-600 hover:text-deep-blue-gray transition-colors py-2 hover:no-underline w-full flex justify-center items-center">
                  <span className="font-medium">{t("Header.freeTools")}</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 mt-2">
                  {/* <NextLink
                    href="/mockups"
                    className={`block text-gray-600 hover:text-deep-blue-gray transition-colors py-1 ${
                      pathname === "/mockups"
                        ? "text-deep-blue-gray font-semibold"
                        : ""
                    }`}
                  >
                    {t("Mockups.title")}
                  </NextLink> */}

                  <NextLink
                    href="/qr-generator"
                    className={`block text-gray-600 hover:text-deep-blue-gray transition-colors py-1 ${
                      pathname === "/qr-generator"
                        ? "text-deep-blue-gray font-semibold"
                        : ""
                    }`}
                  >
                    {t("Header.qrGenerator")}
                  </NextLink>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <NextLink
              href="/contact"
              className={`text-gray-600 hover:text-deep-blue-gray transition-colors ${
                pathname === "/contact"
                  ? "text-deep-blue-gray font-semibold"
                  : ""
              }`}
            >
              {`${t("Contact.contact")} ${t("Contact.us")}`}
            </NextLink>
            {!session && (
              <NextLink
                href="/auth/login"
                className="text-gray-600 hover:text-deep-blue-gray transition-colors"
              >
                {t("Shared.login")}
              </NextLink>
            )}
          </div>
          {!session && (
            <div className="mt-7 flex flex-col gap-4">
              <button className="w-full bg-deep-blue-gray text-white px-6 py-4 rounded-4xl font-bold leading-none">
                <NextLink href="/auth/sign-up">{t("Shared.signup")}</NextLink>
              </button>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
