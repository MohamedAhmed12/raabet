import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
  const isUserConfirmed = req?.nextauth?.token?.id?.is_confirmed;
  if (!isUserConfirmed) {
    return NextResponse.redirect(new URL("/auth/verify", req.url));
  }
  console.log(isUserConfirmed);
  
  return NextResponse.next();
});

// See "Matching Paths" below to learn more
export const config = { matcher: ["/dashboard/:path*"] };
