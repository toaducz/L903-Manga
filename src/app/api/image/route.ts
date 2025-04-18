import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  if (!url || !url.startsWith('https://uploads.mangadex.org/')) {
    return new NextResponse('Invalid or missing URL', { status: 400 })
  }

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'L903-Manga'
      }
    })

    if (!res.ok) {
      return new NextResponse('Failed to fetch image', { status: res.status })
    }

    const contentType = res.headers.get('content-type') || 'image/png'
    const buffer = await res.arrayBuffer()

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400'
      }
    })
  } catch (error) {
    console.error(error)
    return new NextResponse('Error fetching image', { status: 500 })
  }
}
