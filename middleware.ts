import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER || "user";
const BASIC_AUTH_PASS = process.env.BASIC_AUTH_PASS || "password";

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get("authorization");
  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pass] = atob(authValue).split(":");
    if (user === BASIC_AUTH_USER && pass === BASIC_AUTH_PASS) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
