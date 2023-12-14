// export { default } from "next-auth/middleware";
// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage

import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // "withAuth" augments your "Request" with the user's token.
  function middleware(request: NextRequestWithAuth) {
    // console.log("NextUrl pahtname: ", request.nextUrl.pathname);
    // console.log("NextAuth token", request.nextauth.token);

    const roles = request.nextauth.token?.roles.map((roles) =>
      roles.role.toString(),
    );

    // TODO: Need to this check per page/route and per role
    if (
      request.nextUrl.pathname.startsWith("/app/owners") &&
      !roles?.includes("ADMIN")
    ) {
      return NextResponse.rewrite(new URL("/app/denied", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: "/app/:path*",
};
