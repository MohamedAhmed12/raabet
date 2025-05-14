import {defaultLocale} from "@/i18n/routing";
import {cookies} from "next/headers";

export async function customGetLocale() {
  const cookieStore = await cookies();

  const cookieLocale: string =
    (await cookieStore.get("NEXT_LOCALE")?.value) || defaultLocale;

  if (cookieLocale) {
    return cookieLocale;
  }

  return defaultLocale; // Fallback to default locale
}
