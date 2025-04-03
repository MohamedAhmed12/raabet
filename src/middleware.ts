// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// // This function can be marked `async` if using `await` inside
// export default withAuth(function middleware(req) {
//   // the code below only execute if there is session for the authenticated user
//   const isUserConfirmed = req?.nextauth?.token?.user?.is_confirmed;
//   const pathname = req.nextUrl.pathname;

//   if (!isUserConfirmed) {
//     if (pathname.startsWith("/dashboard") || pathname === "/auth/login") {
//       return NextResponse.redirect(new URL("/auth/verify", req.url));
//     }
//   }


//   NextResponse.next();
// });

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/dashboard/:path*", "/auth/login"],
// };
// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(function middleware(req) {
//     interface UserToken {
//         user?: {
//             is_confirmed?: boolean;
//         };
//     }

//     const token = req?.nextauth?.token as UserToken;
//     const isUserConfirmed = token?.user?.is_confirmed;

//     console.log(req.nextauth.token);


//     const pathname = req.nextUrl.pathname;

//     if (!isUserConfirmed) {
//       if (pathname.startsWith("/dashboard") || pathname === "/auth/login") {
//         return NextResponse.redirect(new URL("/auth/verify", req.url));
//       }
//     }

//     return NextResponse.next(); // Explicitly return response
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token, // Ensure the token exists before proceeding
//     },
//   }
// );

// export const config = {
//   matcher: ["/dashboard/:path*", "/auth/login"],
// };

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Check if the user has an active session
    const hasSession = req?.nextauth?.token;
    const pathname = req.nextUrl.pathname;

    // If no session and the user tries to access "/dashboard", redirect to login
    if (!hasSession && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // User must have a session
    },
  }
);

// Apply this middleware only to dashboard-related routes
export const config = {
  matcher: ["/dashboard/:path*"], // Protect all dashboard routes
};
