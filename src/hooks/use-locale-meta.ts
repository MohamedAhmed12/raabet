import { languageMeta } from "@/constants";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function useLocaleMeta() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentLangCode = (): string => {
    return languageMeta[locale]?.code ?? "en";
  };

  const getCurrentLangLabel = (): string => {
    return languageMeta[locale]?.label ?? "English";
  };

  const getOppositeLang = () => {
    const other = Object.keys(languageMeta).find((key) => key !== locale);
    return languageMeta[other!]; // force non-null since we only have 2 langs
  };

  const switchLocale = () => {
    const oppositeLang = getOppositeLang();
    router.push(pathname, {locale: oppositeLang.code});
    router.refresh();
  };

  return {
    locale,
    currentLangCode: getCurrentLangCode(),
    currentLangLabel: getCurrentLangLabel(),
    getOppositeLang: getOppositeLang(),
    switchLocale,
    allLanguages: languageMeta,
  };
}
