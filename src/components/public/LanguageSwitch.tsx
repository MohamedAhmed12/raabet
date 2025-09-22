"use client";

import { useLocaleMeta } from "@/hooks/use-locale-meta";
import { getFontClassClient } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Icon, iconNameType } from "../Icon";

export const LanguageSwitch = () => {
  const locale = useLocale();
  const fontClass = getFontClassClient(locale);
  const [isOpen, setIsOpen] = useState(false);
  const { switchLocale } = useLocaleMeta();

  const handleLanguageChange = () => {
    switchLocale();
    setIsOpen(false);
  };
  const { currentLangCode, allLanguages: languages } = useLocaleMeta();

  return (
    <div className="relative lg:mt-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center hover:bg-gray-50 rounded-full transition-colors cursor-pointer",
          fontClass,
          currentLangCode === "en" ? "w-8 h-8" : "w-9 h-9"
        )}
        aria-label="Switch Language"
        title={currentLangCode === "en" ? "English" : "العربية"}
      >
        <Icon name={currentLangCode as iconNameType} size={1} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 flex flex-col items-center justify-center mt-2 w-14 bg-white rounded-lg shadow-lg border border-gray-200 z-20 min-h-[80px]">
            {languages.map((language) => {
              return (
                <button
                  key={language.code}
                  onClick={handleLanguageChange}
                  className={cn(
                    "w-full flex flex-col items-center justify-center hover:bg-gray-50 transition-colors relative cursor-pointer w-9 h-9",
                    locale === language.code ? "bg-blue-50" : "text-gray-700",
                    fontClass
                  )}
                  title={language.code === "en" ? "English" : "العربية"}
                >
                  {language.code === "en" ? (
                    <Icon name="en" size={1} />
                  ) : (
                    <Icon name="ar" size={1} />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
