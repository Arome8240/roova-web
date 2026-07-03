import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AGENCY_HOSTS = ["agency.roova.xyz", "agency.localhost:3000"];
const ADMIN_HOSTS = ["admin.roova.xyz", "admin.localhost:3000"];

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  const prefix = AGENCY_HOSTS.includes(host)
    ? "/agency"
    : ADMIN_HOSTS.includes(host)
      ? "/admin"
      : null;

  if (!prefix) return NextResponse.next();

  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();
  url.pathname = `${prefix}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
