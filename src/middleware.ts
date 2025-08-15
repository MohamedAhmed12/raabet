import { NextRequestWithAuth } from "next-auth/middleware";
import { NextFetchEvent } from "next/server";
import withAuth from "./middlewares/withAuthMiddleware";
import intlMiddleware from "./middlewares/withI18nMiddleware";
import { withVerification } from "./middlewares/withVerification";

export default async function middleware(
  req: NextRequestWithAuth,
  event: NextFetchEvent
) {
  const {pathname} = req.nextUrl;

  const intlResponse = intlMiddleware(req);
  const localeChanged = intlResponse.cookies.get("NEXT_LOCALE");

  // if needed to be redirect to path that has '[locale]/' in it or local changed
  if (localeChanged || intlResponse.status == 307) return intlResponse;

  // Check if the path is protected
  if (pathname.includes("dashboard")) {
    // First, apply the authentication middleware
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
