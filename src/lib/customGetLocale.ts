import { defaultLocale } from "@/i18n/routing";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";

export async function customGetLocale() {
  // Always try getLocale() first - it reads from URL which should be the source of truth
  const locale = await getLocale();

  // If getLocale() returns a valid locale, use it
  if (locale && ["en", "ar"].includes(locale)) {
    return locale;
  }

  // Fallback to cookie if getLocale() doesn't return a valid locale
  const cookieStore = await cookies();
  const cookieLocale: string =
    (await cookieStore.get("NEXT_LOCALE")?.value) || defaultLocale;

  if (cookieLocale && ["en", "ar"].includes(cookieLocale)) {
    return cookieLocale;
  }

  return defaultLocale; // Final fallback to default locale
}
