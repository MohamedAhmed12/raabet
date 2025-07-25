import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Claim } from "../Claim";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export const ContentSection = () => {
  const t = useTranslations("HomePage.CentralizePresence");
  const locale = useLocale();

  return (
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-start font-noto-sans text-center lg:text-left px-[7vw] min-h-[calc(100vh-220px)] lg:min-h-[calc(100vh-70px-72px)] py-13">
      {/* Avatar & Star Rating */}
      <div className="w-full flex gap-3 place-content-center lg:place-content-start mb-6 lg:mb-2">
        <div className="flex -space-x-2">
          {[...Array(5)].map((_, i) => (
            <Avatar
              key={i}
              className="w-[38px] h-[38px] border border-black bg-white rounded-full shadow-[1.5px_1.5px_0px_#1d1d28]"
            >
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
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
      <h1
        className={cn(
          "text-[44px] leading-none text-deep-blue-gray font-extrabold",
          "lg:text-[66px] lg:leading-[1.1]",
          locale == "ar" ? "text-right" : "text-left"
        )}
      >
        <span className="mr-4">{t("Centralize")}</span>
        <span className="relative">
          <span className="relative inline-block z-[1]">{t("presence")}</span>
          <div className="absolute inset-0 top-[0.85em] bottom-[0.15em] left-[-3%] right-[-3%] bg-[#7ed0ff]"></div>
        </span>
      </h1>

      {/* Description & Input Field */}
      <div className="lg:max-w-[75%] mt-8 mx-auto lg:mx-0">
        <p className="text-lg text-center lg:text-start font-base  text-gray-600 mb-6">
          {t("Description")}
        </p>

        <Claim />
      </div>
    </div>
  );
};
