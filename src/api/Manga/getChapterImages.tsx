// src/api/Manga/getChapterImages.ts
export const getChapterImages = async (chapterId: string) => {
  const res = await fetch(`/api/proxy?endpoint=at-home/server/${chapterId}`, {
    next: { revalidate: 60 }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch chapter images')
  }

  return res.json()
}
