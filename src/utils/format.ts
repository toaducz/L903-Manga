export function removeNoteSection(text: string): string {
  if (!text) {
    return ''
  }
  const lowerText = text.toLowerCase()
  const noteIndex = lowerText.indexOf('note:')
  const altIndex = lowerText.indexOf('Alt')

  let cutIndex = -1

  if (noteIndex !== -1 && altIndex !== -1) {
    cutIndex = Math.min(noteIndex, altIndex)
  } else if (noteIndex !== -1) {
    cutIndex = noteIndex
  } else if (altIndex !== -1) {
    cutIndex = altIndex
  }

  if (cutIndex !== -1) {
    return text.slice(0, cutIndex).trim()
  }

  return text
}

export function splitTextIntoChunks(text: string, chunkSize: number = 500): string[] {
  const chunks: string[] = []
  let i = 0
  while (i < text.length) {
    chunks.push(text.slice(i, i + chunkSize))
    i += chunkSize
  }
  return chunks
}

export function convertToVietnameseTime(englishTime: string): string {
  return englishTime
    .replace(/HOURS?/i, 'giờ')
    .replace(/MINUTES?/i, 'phút')
    .replace(/SECONDS?/i, 'giây')
    .toLowerCase()
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Asia/Ho_Chi_Minh'
  }).format(date)
}
