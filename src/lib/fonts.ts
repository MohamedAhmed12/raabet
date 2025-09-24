import { getLocale } from "next-intl/server";

export async function getFontClass(locale?: string) {
  const currentLocale = locale || await getLocale();
  return currentLocale === "ar" ? "font-cairo" : "font-noto-sans";
}

export function getFontClassClient(locale: string) {
  return locale === "ar" ? "font-cairo" : "font-noto-sans";
}
