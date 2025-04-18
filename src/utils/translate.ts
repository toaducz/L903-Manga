export const translateText = async (text: string): Promise<string> => {
  try {
    // Kiểm tra text hợp lệ
    if (!text || typeof text !== 'string' || text.trim() === '') {
      throw new Error('Văn bản cần dịch không hợp lệ')
    }

    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: text.trim(), // Loại bỏ khoảng trắng thừa
        source: 'en',
        target: 'vi',
        format: 'text'
      })
    })

    const data = await response.json()
    console.log('Next.js API response:', data)

    if (response.ok && data && data.translatedText) {
      return data.translatedText
    } else {
      throw new Error(data.error || 'Dịch thất bại')
    }
  } catch (error) {
    console.error('Error while translating:', error)
    return 'Không thể dịch văn bản'
  }
}
