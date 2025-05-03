import {NextRequest, NextResponse, NextFetchEvent} from "next/server";
import createMiddleware from "next-intl/middleware";
import withAuth from "./middlewares/withAuthMiddleware"; // Authentication middleware
import {withVerification} from "./middlewares/withVerification"; // Verification middleware

const locales = ["en", "ar"];
const defaultLocale = "ar";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
});

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const {pathname} = req.nextUrl;

  // Apply localization middleware first
  const intlResponse = intlMiddleware(req);
  if (intlResponse) return intlResponse;

  // Check if the path is protected
  const protectedPaths = ["/dashboard", "/:locale/dashboard"];
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    // First, apply the authentication middleware
    const authResponse = await withAuth(req, event);
    if (authResponse) return authResponse; // Redirect if not authenticated

    // Then, apply the verification middleware
    const verificationResponse = withVerification(req);
    if (verificationResponse) return verificationResponse; // Redirect if not verified
  }

  return NextResponse.next(); // Proceed with the request
}
