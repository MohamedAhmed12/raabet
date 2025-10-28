import {languageMeta} from "@/constants";
import {defineRouting} from "next-intl/routing";

const locales = languageMeta.map(lang => lang.code);

export const defaultLocale = "ar";
export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  localePrefix: 'always', // or 'as-needed'
  localeDetection: false, // Disable automatic locale detection to always use default 'ar'
});
