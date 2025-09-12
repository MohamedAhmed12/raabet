import { NextRequestWithAuth } from "next-auth/middleware";
import { NextFetchEvent } from "next/server";
import withAuth from "./middlewares/withAuthMiddleware";
import intlMiddleware from "./middlewares/withI18nMiddleware";
import { withVerification } from "./middlewares/withVerification";

export default async function middleware(
  req: NextRequestWithAuth,
  event: NextFetchEvent
) {
  const intlResponse = intlMiddleware(req);
  // Check if this is a redirect response from intl middleware
  const isIntlLocaleRedirect =
    intlResponse.status === 307 && req.url !== intlResponse.url;

  // If intl middleware wants to redirect, let it handle locale routing
  if (isIntlLocaleRedirect) {
    return intlResponse;
  }

  const pathname = req?.nextUrl?.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);

  // Extract locale from URL (first segment)
  const localeFromUrl = pathSegments[0];
  const isValidLocale = ["en", "ar"].includes(localeFromUrl);

  // If no valid locale in URL, let intl middleware handle it
  if (!isValidLocale) {
    return intlResponse;
  }

  const routePath =
    pathSegments.length > 1 ? `/${pathSegments.slice(1).join("/")}` : "/"; // Fixed: Add leading slash

  // Check if the path is protected
  if (
    routePath.startsWith("/dashboard") ||
    routePath.startsWith("/auth/verify")
  ) {
    const authResponse = await withAuth(req, event);
    if (authResponse) return authResponse;

    // Then, apply the verification middleware
    const verificationResponse = await withVerification(req);
    if (verificationResponse) return verificationResponse;
  }

  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|logout|_next|.*\\..*).*)"], // Matches all paths except for API routes and static files
};
