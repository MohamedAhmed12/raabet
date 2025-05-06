import { NextRequestWithAuth } from "next-auth/middleware";
import { getLocale } from "next-intl/server";
import { NextFetchEvent, NextResponse } from "next/server";
import withAuth from "./middlewares/withAuthMiddleware";
import intlMiddleware from "./middlewares/withI18nMiddleware";
import { withVerification } from "./middlewares/withVerification";

export default async function middleware(
  req: NextRequestWithAuth,
  event: NextFetchEvent
) {
  const {pathname} = req.nextUrl;

  const intlResponse = intlMiddleware(req);
  const currentLocale = await getLocale();
  const localeChanged = intlResponse.cookies.get("NEXT_LOCALE");
  const requestLocal = req.cookies.get("NEXT_LOCALE")?.value;

  // if needed to be redirect to path that has '[locale]/' in it or local changed
  if (
    localeChanged ||
    intlResponse.status == 307 ||
    requestLocal != currentLocale
  )
    return intlResponse;

  // Check if the path is protected
  if (pathname.includes("dashboard")) {
    // First, apply the authentication middleware
    const authResponse = await withAuth(req, event);
    if (authResponse) return authResponse;

    // Then, apply the verification middleware
    const verificationResponse = withVerification(req);

    if (verificationResponse) return verificationResponse;
  }

  return NextResponse.next(); // Proceed with the request
}

export const config = {
  matcher: ["/((?!api|logout|_next|.*\\..*).*)"], // Matches all paths except for API routes and static files
};
