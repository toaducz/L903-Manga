import { convertToVietnameseTime } from './format'

export async function translateText(text: string): Promise<string> {
  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|vi`)
    const data = await res.json()

    if (data.responseStatus !== 200) {
      const errorMessage: string = data.responseDetails || 'Unknown error'

      // Kiểm tra lỗi quota từ MyMemory
      if (errorMessage.includes('YOU USED ALL AVAILABLE FREE TRANSLATIONS FOR TODAY')) {
        const regex = /NEXT AVAILABLE IN\s+(.*?)\s+VISIT/i
        const match = errorMessage.match(regex)
        const remainingTime = match ? match[1] : 'vài giờ nữa'
        throw new Error(`Không thể dịch được, xin vui lòng thử lại sau ${convertToVietnameseTime(remainingTime)}`)
      }

      throw new Error(`Lỗi dịch: ${errorMessage}`)
    }

    return data.responseData.translatedText
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Lỗi khi dịch: ${error.message}`)
    } else {
      throw new Error('Lỗi không xác định khi dịch.')
    }
  }
}
