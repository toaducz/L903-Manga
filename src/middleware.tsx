import { NextRequest, NextResponse } from 'next/server'

/**
 * Middleware: redirect tất cả pathname về trang chủ `/`
 * Ngoại lệ:
 *  - `/`           → trang đích, không redirect để tránh vòng lặp
 *  - `/_next/*`    → asset nội bộ của Next.js
 *  - `/api/*`      → API routes (image proxy, v.v.)
 *  - `/favicon.ico`, `/robots.txt`, `/sitemap.xml` → static files
 */

const BYPASS_PREFIXES = ['/_next/', '/api/']
const BYPASS_EXACT = ['/self-host', '/favicon.ico', '/robots.txt', '/sitemap.xml']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Cho qua các route nội bộ và static files
  if (BYPASS_EXACT.includes(pathname) || BYPASS_PREFIXES.some(prefix => pathname.startsWith(prefix))) {
    return NextResponse.next()
  }

  // Redirect tất cả các route còn lại về trang self-host
  const url = request.nextUrl.clone()
  url.pathname = '/self-host'
  return NextResponse.redirect(url)
}

export const config = {
  /*
   * Match tất cả các route NGOẠI TRỪ:
   * - /_next/static  (static files)
   * - /_next/image   (image optimization)
   * - /favicon.ico
   */
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}
