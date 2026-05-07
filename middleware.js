import { NextResponse } from "next/server";

const rateLimit = new Map();

const WINDOW_MS = 60 * 1000; // 1 menit
const MAX_REQUESTS = 100; // maksimal 100 request per menit per IP

function isRateLimited(ip) {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, []);
  }

  const requests = rateLimit.get(ip).filter((time) => time > windowStart);
  requests.push(now);
  rateLimit.set(ip, requests);

  return requests.length > MAX_REQUESTS;
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Ambil IP pengunjung
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Rate limiting untuk API routes
  if (pathname.startsWith("/api/")) {
    if (isRateLimited(ip)) {
      return new NextResponse(
        JSON.stringify({ error: "Terlalu banyak request. Coba lagi nanti." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  // Proteksi admin — redirect ke login kalau belum login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const cookies = request.cookies.getAll();
    const hasSession = cookies.some(
      (c) => c.name.includes("sb-") && c.name.includes("auth-token")
    );

    if (!hasSession) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Security headers
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};