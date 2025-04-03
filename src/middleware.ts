import { withAuth } from "next-auth/middleware";

export default withAuth({});

// Apply this middleware only to dashboard-related routes
export const config = {
  matcher: ["/dashboard/:path*"], // Protect all dashboard routes
};
