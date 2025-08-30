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
  // const localeChanged = intlResponse.cookies.get("NEXT_LOCALE");
  const isLocaleRedirect =
    intlResponse.status === 307 && req.url !== intlResponse.url;

  // if needed to be redirect to path that has '[locale]/' in it or local changed
  if (isLocaleRedirect) {
    return intlResponse;
  }

  const pathname = req?.nextUrl?.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  const routePath = `/${pathSegments.slice(1).join("/")}`; // Fixed: Add leading slash

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
