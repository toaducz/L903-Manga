import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { q, source, target } = await req.json()

    // Kiểm tra đầu vào
    if (!q || !source || !target) {
      return NextResponse.json({ error: 'Thiếu tham số q, source, hoặc target' }, { status: 400 })
    }

    // Xây dựng URL với encodeURIComponent
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=${encodeURIComponent(source)}|${encodeURIComponent(target)}`
    // console.log('MyMemory URL:', url) // Log để debug

    const response = await fetch(url, {
      method: 'GET'
    })
    const data = await response.json()
    console.log('MyMemory response:', data) // Log để debug

    if (response.ok && data.responseData && data.responseData.translatedText) {
      return NextResponse.json({ translatedText: data.responseData.translatedText })
    } else {
      return NextResponse.json({ error: data.responseDetails || 'Dịch thất bại' }, { status: 500 })
    }
  } catch (error) {
    console.error('Error in API Route:', error)
    return NextResponse.json({ error: 'Không thể dịch văn bản' }, { status: 500 })
  }
}
