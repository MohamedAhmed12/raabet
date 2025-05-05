interface LanguageInfo {
  label: string;
  code: string;
}

export const languageMeta: Record<string, LanguageInfo> = {
  ar: {label: "العربية", code: "ar"},
  en: {label: "English", code: "en"},
};