import { NextRequest, NextResponse } from 'next/server'

const BYPASS_PREFIXES = ['/_next/', '/api/']
const BYPASS_EXACT = ['/self-host', '/favicon.ico', '/robots.txt', '/sitemap.xml']

export function middleware(request: NextRequest) {
  if (process.env.DISABLE_MIDDLEWARE === 'true') {
    return NextResponse.next()
  }

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
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}
