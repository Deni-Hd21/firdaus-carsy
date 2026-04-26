import { NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("sb-patwrieglmispxadpuhl-auth-token");
    const token2 = request.cookies.get("sb-patwrieglmispxadpuhl-auth-token.0");

    if (!token && !token2) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
