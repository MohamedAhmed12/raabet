import {languageMeta} from "@/constants";
import {defineRouting} from "next-intl/routing";

const locales = Object.keys(languageMeta);

export const defaultLocale = "en";
export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  localePrefix: 'always', // or 'as-needed'
  localeDetection: true,
});
