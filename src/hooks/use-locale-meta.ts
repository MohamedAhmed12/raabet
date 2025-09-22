import { languageMeta } from "@/constants";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function useLocaleMeta() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentLang = () => {
    return languageMeta.find((lang) => lang.code === locale) ?? languageMeta[1]; // fallback to English
  };

  const getCurrentLangCode = (): string => {
    return getCurrentLang().code;
  };

  const getCurrentLangLabel = (): string => {
    return getCurrentLang().label;
  };

  const getOppositeLang = () => {
    return languageMeta.find((lang) => lang.code !== locale) ?? languageMeta[0]; // fallback to Arabic
  };

  const switchLocale = () => {
    const oppositeLang = getOppositeLang();
    router.push(pathname, { locale: oppositeLang.code });
    router.refresh();
  };

  return {
    locale,
    currentLang: getCurrentLang(),
    currentLangCode: getCurrentLangCode(),
    currentLangLabel: getCurrentLangLabel(),
    getOppositeLang: getOppositeLang(),
    switchLocale,
    allLanguages: languageMeta,
  };
}
