import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import createMiddleware from 'next-intl/middleware';

export default withAuth(function middleware(req) {
  if (!req?.nextauth?.token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  const isUserConfirmed = req?.nextauth?.token?.id?.is_confirmed;
  if (!isUserConfirmed) {
    return NextResponse.redirect(new URL("/auth/verify", req.url));
  }  
  return NextResponse.next();
});

// See "Matching Paths" below to learn more
export const config = { matcher: ["/dashboard/:path*"] };
