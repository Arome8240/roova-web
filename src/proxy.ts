import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AGENCY_HOSTNAMES = ["agency.roova.xyz", "agency.localhost"];
const ADMIN_HOSTNAMES = ["admin.roova.xyz", "admin.localhost"];

export function proxy(request: NextRequest) {
  // Strip the port so local dev matches regardless of which port the dev
  // server actually bound to (3000 may be taken by something else).
  const hostname = (request.headers.get("host") ?? "").split(":")[0];

  const prefix = AGENCY_HOSTNAMES.includes(hostname)
    ? "/agency"
    : ADMIN_HOSTNAMES.includes(hostname)
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
