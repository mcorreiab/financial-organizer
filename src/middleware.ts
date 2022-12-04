import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.cookies.has("access_token")) {
    return NextResponse.rewrite(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: ["/"],
};
