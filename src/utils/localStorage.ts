import { Chapter } from '@/api/Manga/getChapter'

type ReadingItem = {
  mangaId: string
  chapterId: string
  updatedAt: number
  chapter: Chapter[]
  title: string
  number: string
  lang: string
}

const STORAGE_KEY = 'reading_history'

export const saveReadingHistory = (
  mangaId: string,
  chapterId: string,
  chapter: Chapter[],
  title: string,
  number: string,
  lang: string
) => {
  if (typeof window === 'undefined') return

  const current = localStorage.getItem(STORAGE_KEY)

  let history: ReadingItem[] = []

  if (current) {
    try {
      history = JSON.parse(current)
    } catch {
      history = []
    }
  }

  // Kiểm tra trùng -> Update
  const existing = history.find(item => item.mangaId === mangaId)
  if (existing) {
    existing.chapterId = chapterId
    existing.updatedAt = Date.now()
    existing.chapter = chapter
    existing.title = title
    existing.number = number
    existing.lang = lang
  } else {
    history.push({
      mangaId,
      chapterId,
      updatedAt: Date.now(),
      chapter,
      title,
      number,
      lang
    })
  }

  // Giới hạn 20 mục mới nhất
  const maxItems = 20
  history = history.sort((a, b) => b.updatedAt - a.updatedAt).slice(0, maxItems)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
}
