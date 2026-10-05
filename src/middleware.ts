import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { securityHeadersForRequest } from "@/lib/security-headers";

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";
  const hostname = request.nextUrl.hostname;
  const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const headers = securityHeadersForRequest({ nonce, isDev, isLocalHost });
  const csp = headers.find((header) => header.key === "Content-Security-Policy")?.value;
  if (csp) {
    requestHeaders.set("Content-Security-Policy", csp);
  }

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  for (const header of headers) {
    response.headers.set(header.key, header.value);
  }

  return response;
}

export const config = {
  matcher: [
    {
      source:
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
