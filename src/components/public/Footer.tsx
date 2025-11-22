"use client";

import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Link, Loader2, Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import NextLink from "next/link";
import { Icon } from "../Icon";
import { useNewsletterSubscribe } from "./hooks/useNewsletterSubscribe";

export const Footer = () => {
  const t = useTranslations();
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);

  const { mutate: subscribe, isSuccess, isPending } = useNewsletterSubscribe();

  const handleSubscribe = async (formData: FormData) => {
    const email = formData.get("email") as string;
    if (!email) return;

    await subscribe({ email });
  };

  return (
    <footer
      className={cn(
        "flex flex-col items-start justify-between bg-deep-blue-gray text-gray-300 text-gray-300 py-[60px] px-[7vw]",
        "lg:flex-row gap-8.5 lg:gap-0",
        fontClass
      )}
    >
      <div className="flex flex-col gap-8.5 lg:flex-row lg:gap-21">
        <div className="flex flex-col gap-5">
          <NextLink href="/" className="flex items-center gap-1 text-white">
            <Link
              size={21}
              width={21}
              strokeWidth={3.5}
              fontWeight={800}
              className="text-[#1b97f5]"
            />
            <span
              className={cn(
                "font-bold capitalize",
                locale === "ar" ? "text-4xl" : "text-3xl"
              )}
            >
              {t("Shared.rabet")}
            </span>
          </NextLink>

          <div>
            {t("Footer.CentralizePresence")}
            <br />
            {t("Footer.builtWith")}

            {/* put my rabet page in the future after creating more of the leade generating free projects */}
            <NextLink href="#" className="mx-1" target="_blank">
              Gad
            </NextLink>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-xl font-semibold text-white">
            {t("Footer.resources")}
          </div>
          <div className="flex flex-col gap-1 !text-sm">
            <NextLink href="/contact">{t("Shared.contactUs")}</NextLink>
            {/* implement next  */}
            {/* 
                <NextLink   
                href="/i/qr-code"
                >
                <div>Free: QR Code Maker</div>
                </NextLink>
                <NextLink
                
                href="https://www.mock.club"
                target="_blank"
                >
                <div>Free: Device Mockups</div>
                </NextLink>
                <NextLink
                
                href="https://www.wallpaper.fm/"
                target="_blank"
                >
                <div>Free: Background Images</div>
                </NextLink> 
            */}
            <NextLink href="/auth/sign-up">{t("Shared.signup")}</NextLink>
            <NextLink href="/auth/login">{t("Shared.login")}</NextLink>
            {/* 
                <NextLink href="/i/terms-of-service" target="_blank">
                <div>Terms of Service</div>
                </NextLink>
                <NextLink href="/i/cookie-policy" target="_blank">
                <div>Cookie Policy</div>
                </NextLink>
                <NextLink href="/i/privacy-policy" target="_blank">
                <div>Privacy Policy</div>
                </NextLink> 
            */}
          </div>
        </div>
      </div>

      <div className="w-[350px] flex flex-col gap-4 justify-center items-start">
        <div className="text-xl font-semibold text-white">
          {t("Footer.stayUpdated")}
        </div>
        {!isSuccess ? (
          <form
            action={handleSubscribe}
            className={cn(
              "flex gap-3 bg-white p-2.5 rounded-4xl w-full ml-[-4px]",
              "lg:m-0"
            )}
          >
            <input
              name="email"
              className="w-full !text-muted-foreground placeholder:text-gray-400 focus:outline-none !focus:bg-white"
              placeholder="Email address"
              type="email"
              required
            />
            <button
              className="bg-deep-blue-gray text-white p-2 rounded-4xl font-bold leading-none cursor-pointer"
              aria-label="Subscribe to our newsletter"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 />
              ) : locale == "ar" ? (
                <ArrowLeft />
              ) : (
                <ArrowRight />
              )}
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-1 text-sm">
            <div>{t("Footer.subscribed.thanks")}</div>
            <div>{t("Footer.subscribed.updates")}</div>
          </div>
        )}
        <div className="flex gap-3 w-full">
          <NextLink
            className="flex justify-center items-center hover:transform hover:scale-110 text-deep-blue-gray bg-primary w-10 h-10 rounded-full"
            title="Email"
            href="mailto:support@rabet-link.com"
          >
            <Mail />
          </NextLink>
          <NextLink
            className="flex justify-center items-center hover:transform hover:scale-110 text-deep-blue-gray bg-green-200 w-10 h-10 rounded-full"
            title="X (Twitter)"
            href="https://www.tiktok.com/@rabetlink?_t=ZS-90R2oaQBTHd&_r=1&utm_source=rabetlink.com&utm_medium=website&utm_campaign=tiktok_profile"
            target="_blank"
          >
            <Icon name="tiktok" className="!w-5 !h-5" />
          </NextLink>
          <NextLink
            className="flex justify-center items-center hover:transform hover:scale-110 text-deep-blue-gray bg-orange-200 w-10 h-10 rounded-full"
            title="X (Twitter)"
            href="https://x.com/RabetLink?utm_source=rabetlink.com&utm_medium=website&utm_campaign=twitter_profile"
            target="_blank"
          >
            <Icon name="twitter" className="!w-5 !h-5" />
          </NextLink>
          <NextLink
            className="flex justify-center items-center hover:transform hover:scale-110 text-deep-blue-gray bg-red-200 w-10 h-10 rounded-full"
            title="Instagram"
            href="https://www.instagram.com/rabetlink?igsh=Z291c2RnOWF2M2F0&utm_source=rabetlink.com&utm_medium=website&utm_campaign=instagram_profile"
          >
            <Icon name="instagram" className="!w-5 !h-5" />
          </NextLink>
          {/* <NextLink
            className="flex justify-center items-center hover:transform hover:scale-110 text-deep-blue-gray bg-stone-200 w-10 h-10 rounded-full"
            title="Linkedin"
            href="https://www.youtube.com/@rabet"
            target="_blank"
          >
            <Icon name="youtube" className="!w-5 !h-5" />
          </NextLink> */}
        </div>
      </div>
    </footer>
  );
};
