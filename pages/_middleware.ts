import { NextResponse, NextRequest } from "next/server";

import * as jose from "jose";
import { env } from "process";

export default function middleware(req: NextRequest) {
  const jwt_Secret = env.JWT_SECRET;
  const origin = req.nextUrl.origin;
  const token = req.cookies.token;
  const url = req.url;
  if (url.includes("/login")) {
    if (token) {
      try {
        jose.jwtVerify(token, new TextEncoder().encode(jwt_Secret));
        return NextResponse.redirect(origin + "/");
      } catch {
        return NextResponse.next();
      }
    }
  }
  if (url.includes("/signup")) {
    if (token) {
      try {
        jose.jwtVerify(token, new TextEncoder().encode(jwt_Secret));
        return NextResponse.redirect(origin + "/");
      } catch {
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}
