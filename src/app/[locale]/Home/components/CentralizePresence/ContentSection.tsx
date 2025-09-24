"use client";

import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Claim } from "../Claim";

const avatars = [
  { src: "/images/avatars/khalid-al-gurayed.webp", alt: "Khalid Al-Gurayed" },
  { src: "/images/avatars/ovioo.webp", alt: "Ovioo" },
  { src: "/images/avatars/noah-johnson.webp", alt: "Noah Johnson" },
  { src: "/images/avatars/ameera-al-eisaei.webp", alt: "Ameera Al-Eisaei" },
  { src: "/images/avatars/sara-al‑zahrani.webp", alt: "Sara Al-Zahrani" },
];
export const ContentSection = () => {
  const t = useTranslations("HomePage.CentralizePresence");
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);

  return (
    <div
      className={cn(
        "w-full lg:w-1/2 flex flex-col justify-center items-start text-center lg:text-left px-[7vw] min-h-[calc(100vh-220px)] lg:min-h-[calc(100vh-70px-72px)] py-13",
        fontClass
      )}
    >
      {/* Avatar & Star Rating */}
      <div className="w-full flex gap-3 place-content-center lg:place-content-start mb-6 lg:mb-2">
        <div className="flex -space-x-2">
          {avatars.map((avatar, i) => (
            <div
              key={i}
              className="relative w-[38px] h-[38px] border border-black bg-white rounded-full shadow-[1.5px_1.5px_0px_#1d1d28] overflow-hidden"
            >
              <Image
                src={avatar.src}
                alt={avatar.alt}
                width={38}
                height={38}
                className="object-cover w-full h-full"
                priority
                sizes="(max-width: 768px) 38px, 38px"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="text-yellow-400 fill-yellow-400"
                size={18}
              />
            ))}
          </div>
          <p className="text-sm lg:text-lg  font-normal lg:font-semibold text-gray-500">
            {t("users")}
          </p>
        </div>
      </div>

      {/* Heading */}
      <h1
        className={cn(
          "text-[44px] text-deep-blue-gray font-extrabold text-center",
          locale == "ar"
            ? "leading-[1.3] lg:text-[62px] lg:text-right"
            : "leading-none lg:text-[66px] lg:leading-[1.1] lg:text-left"
        )}
      >
        {locale == "ar" ? (
          <>
            <span className="ml-4">اجعل</span>
            <span className="relative">
              <span className="relative inline-block z-[1]"></span>
              <span className="relative inline-block z-[1]">وجودك</span>
              <div className="absolute inset-0 left-[-3%] right-[-3%] bg-[#7ed0ff] top-[1.05em] bottom-[0.5em]"></div>
            </span>
            <span className="mr-4">علي الانترنت مركزي</span>
          </>
        ) : (
          <>
            <span className="me-4">Centralize your online</span>
            <span className="relative">
              <span className="relative inline-block z-[1]">presence</span>
              <div
                className={cn(
                  "absolute inset-0 left-[-3%] right-[-3%] bg-[#7ed0ff]",
                  locale == "ar"
                    ? "top-[1.05em] bottom-[0.52em]"
                    : "top-[0.88em] bottom-[0.15em]"
                )}
              ></div>
            </span>
          </>
        )}
      </h1>

      {/* Description & Input Field */}
      <div className="lg:max-w-[90%] mt-8 mx-auto lg:mx-0">
        <p className="text-lg text-center lg:text-start font-base  text-gray-600 mb-6">
          {t("Description")}
        </p>

        <Claim />
      </div>
    </div>
  );
};
