export const getChapterImages = async (chapterId: string) => {
  const res = await fetch(`https://api.mangadex.org/at-home/server/${chapterId}`)
  if (!res.ok) throw new Error('Failed to fetch chapter images')
  return res.json()
}
