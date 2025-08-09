import { getLocale } from "next-intl/server";

export async function getFontClass() {
  const locale = await getLocale();
  return locale === "ar" ? "font-cairo" : "font-noto-sans";
}

export function getFontClassClient(locale: string) {
  return locale === "ar" ? "font-cairo" : "font-noto-sans";
}
