// app/api/proxy/route.ts
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const endpoint = searchParams.get('endpoint')

  const params = new URLSearchParams(searchParams)
  params.delete('endpoint') // tránh lặp

  const url = `https://api.mangadex.org/${endpoint}?${params.toString()}`

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'L903-Manga',
      'Accept': 'application/json'
    }
  })

  const data = await res.json()

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
