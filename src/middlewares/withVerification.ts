import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export function withVerification(req: NextRequestWithAuth) {
  // @ts-expect-error: [to access user data in session it exists in id]
  const isUserConfirmed: string = req?.nextauth?.token?.id?.is_confirmed;
  const pathname = req?.nextUrl?.pathname;
  const pathSegments = pathname.split("/").filter(Boolean);
  const routePath = `/${pathSegments.slice(1).join("/")}`; // Fixed: Add leading slash

  if (!isUserConfirmed && routePath.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/verify", req.url));
  }

  //  If the user is confirmed and the current URL is 'auth/verify', redirect to the dashboard
  if (isUserConfirmed && routePath.startsWith("/auth/verify")) {
    return NextResponse.redirect(
      new URL("/dashboard/admin/profile/links", req.url)
    );
  }

  return null;
}
