import createMiddleware from "next-intl/middleware";

const locales = ["ar", "en"];
const defaultLocale = "ar";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
});

export default intlMiddleware;
