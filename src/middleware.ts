import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const currentCookie = req.cookies.get("auth");
  const { pathname } = req.nextUrl;
  const pathnameStartWith = (url: string) => pathname.startsWith(url);

  if (!currentCookie) {
    if (
      pathname === "/" ||
      pathnameStartWith("/dashboard") ||
      pathnameStartWith("/carts") ||
      pathnameStartWith("/products") ||
      pathnameStartWith("/signout")
    ) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  if (currentCookie) {
    if (req.url.includes("/signin") || pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}
