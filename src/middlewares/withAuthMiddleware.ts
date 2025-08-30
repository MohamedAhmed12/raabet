import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req: NextRequestWithAuth) {
  const isUserAuth = req?.nextauth?.token;

  // if route is dashboard and user is not authenticated redirect to login
  if (!isUserAuth) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return null;
});
