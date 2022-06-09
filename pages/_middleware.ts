import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import * as jose from "jose";
import { env } from "process";

export default function middleware(req: NextApiRequest) {
  const jwt_Secret = env.JWT_SECRET;
  const token = req.cookies.token;
  const url = req.url;

  if (url && url.includes("/login")) {
    if (token) {
      try {
        jose.jwtVerify(token, new TextEncoder().encode(jwt_Secret));
        return NextResponse.redirect("/dashboard");
      } catch (err) {
        return NextResponse.next();
      }
    }
  }
  if (url && url.includes("/signup")) {
    if (token) {
      try {
        jose.jwtVerify(token, new TextEncoder().encode(jwt_Secret));
        return NextResponse.redirect("/dashboard");
      } catch (err) {
        return NextResponse.next();
      }
    }
  }
  if (url && url.includes("/")) {
    if (token) {
      try {
        jose.jwtVerify(token, new TextEncoder().encode(jwt_Secret));
        return NextResponse.redirect("/dashboard");
      } catch (err) {
        return NextResponse.next();
      }
    }
  }

  if (url && url.includes("/dashboard")) {
    if (!token) {
      return NextResponse.redirect("/login");
    }
    try {
      jose.jwtVerify(token, new TextEncoder().encode(jwt_Secret));
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect("/login");
    }
  }

  return NextResponse.next();
}
