"use client";

import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { AppWindow, Clock8, HandHelping, LucideIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Marquee from "react-fast-marquee";

interface Props {
  colorClass?: string;
  bgColorClass: string;
}
interface Message {
  text: string;
  icon: LucideIcon;
}

const messages: Message[] = [
  { text: "block", icon: AppWindow },
  { text: "live", icon: Clock8 },
  { text: "customizable", icon: HandHelping },
  { text: "block", icon: AppWindow },
  { text: "live", icon: Clock8 },
  { text: "customizable", icon: HandHelping },
  { text: "block", icon: AppWindow },
  { text: "live", icon: Clock8 },
  { text: "customizable", icon: HandHelping },
  { text: "block", icon: AppWindow },
  { text: "live", icon: Clock8 },
  { text: "customizable", icon: HandHelping },
];

export const Prosbar = ({
  colorClass = "text-deep-blue-gray",
  bgColorClass,
}: Props) => {
  const t = useTranslations("HomePage.AnimatedBar.Prosbar");
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);

  const duplicatedMessages = [...messages, ...messages];

  return (
    <div
      className={cn(
        "flex min-h-[60px] lg:min-h-[102px] max-w-full py-4 overflow-hidden font-bold uppercase tracking-wide border border-y-black",
        fontClass,
        colorClass,
        bgColorClass
      )}
    >
      <Marquee
        direction={locale === "ar" ? "left" : "right"}
        style={{
          direction: locale === "ar" ? "ltr" : undefined,
        }}
        speed={50}
        autoFill={true}
        pauseOnHover={true}
        gradient={false}
        loop={0}
      >
        <div className="flex">
          {duplicatedMessages.map(({ text, icon: Icon }, index) => {
            return (
              <div
                key={index}
                className="flex items-center text-xl lg:text-2xl"
              >
                <Icon size={30} />
                <p className="px-8">{t(text)}</p>
              </div>
            );
          })}
        </div>
      </Marquee>
    </div>
  );
};
