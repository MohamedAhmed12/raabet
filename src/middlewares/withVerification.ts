import {NextRequest, NextResponse} from "next/server";

export function withVerification(req: NextRequest) {
  const currentUrl = req.url;
  const isUserConfirmed = req?.nextauth?.token?.id?.is_confirmed;

  if (!isUserConfirmed) {
    return NextResponse.redirect(new URL("/auth/verify", req.url));
  }

  // If the user is confirmed and the current URL is 'auth/verify', redirect to the dashboard
  if (isUserConfirmed && currentUrl.includes("/auth/verify")) {
    return NextResponse.redirect(
      new URL("/dashboard/admin/profile/links", req.url)
    );
  }

  return NextResponse.next();
}
