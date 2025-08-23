import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Claim } from "../Claim";

const avatars = [
  "/images/avatars/khalid-al-gurayed.webp",
  "/images/avatars/ovioo.webp",
  "/images/avatars/noah-johnson.webp",
  "/images/avatars/ameera-al-eisaei.webp",
  "/images/avatars/sara-al‑zahrani.webp",
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
            <Avatar
              key={i}
              className="w-[38px] h-[38px] border border-black bg-white rounded-full shadow-[1.5px_1.5px_0px_#1d1d28]"
            >
              <AvatarImage src={avatar} />
            </Avatar>
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

      {locale == "ar" ? (
        <h1
          className={cn(
            "text-[44px] leading-[1.3] text-deep-blue-gray font-extrabold text-center",
            "lg:text-[62px] lg:text-right"
          )}
        >
          <span className="ml-4">اجعل</span>
          <span className="relative">
            <span className="relative inline-block z-[1]"></span>
            <span className="relative inline-block z-[1]">وجودك</span>
            <div className="absolute inset-0 left-[-3%] right-[-3%] bg-[#7ed0ff] top-[1.05em] bottom-[0.5em]"></div>
          </span>
          <span className="mr-4">علي الانترنت مركزي</span>
        </h1>
      ) : (
        <h1
          className={cn(
            "text-[44px] leading-none text-deep-blue-gray font-extrabold text-center",
            "lg:text-[66px] lg:leading-[1.1]",
            locale == "ar" ? "lg:text-right" : "lg:text-left"
          )}
        >
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
        </h1>
      )}

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
