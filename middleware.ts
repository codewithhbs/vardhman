import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, verifyToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  const isAuthApi = pathname.startsWith("/api/admin/auth");

  if (isAuthApi) return NextResponse.next();

  const token = req.cookies.get(AUTH_COOKIE)?.value;
  const user = await verifyToken(token);

  if (pathname.startsWith("/api/admin")) {
    if (!user) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    return NextResponse.next();
  }

  if (isLoginPage) {
    if (user) return NextResponse.redirect(new URL("/admin", req.url));
    return NextResponse.next();
  }

  if (!user) {
    const url = new URL("/admin/login", req.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
