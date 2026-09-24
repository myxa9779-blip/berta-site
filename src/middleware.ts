import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.searchParams.has("source")) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.searchParams.delete("source");
  return NextResponse.redirect(url, 301);
}

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"] };
