'use client'

import { Chapter } from '@/api/Manga/getChapter'
import { getLanguageName } from '@/utils/enums'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { getChaptersByMangaId } from '@/api/Manga/getChapter'
import { useState, useEffect } from 'react'

interface ChapterNavButtonProps {
  chapter: Chapter | null
  direction: 'prev' | 'next'
  mangaId: string
  offset: string
  langFilterValue: string | string[]
  langValue: string
  order: string
  limit: number
  total: number
}

const ChapterNavButton = ({
  chapter,
  direction,
  mangaId,
  offset,
  langFilterValue,
  langValue,
  order,
  limit,
  total
}: ChapterNavButtonProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [hasMoreChapters, setHasMoreChapters] = useState(true)

  // Kiểm tra xem có chapter mới cho offset tiếp theo/trước đó
  useEffect(() => {
    const checkChapters = async () => {
      const newOffset = direction === 'next' ? Number(offset) + limit : Number(offset) - limit
      if (newOffset < 0 || newOffset >= total) {
        setHasMoreChapters(false)
        return
      }

      try {
        const chaptersData = await queryClient.fetchQuery(
          getChaptersByMangaId({
            id: mangaId,
            offset: newOffset,
            limit,
            order,
            lang: Array.isArray(langFilterValue) ? langFilterValue : [langFilterValue]
          })
        )
        setHasMoreChapters(!!chaptersData?.data?.length)
      } catch (error) {
        console.error('Error checking chapters:', error)
        setHasMoreChapters(false)
      }
    }

    if (!chapter) {
      checkChapters()
    }
  }, [chapter, direction, mangaId, offset, limit, total, langFilterValue, order, queryClient])

  // Kiểm tra điều kiện vô hiệu hóa nút
  const isDisabled =
    (direction === 'next' && (!chapter || !hasMoreChapters || Number(offset) >= total)) ||
    (direction === 'prev' && (!chapter || !hasMoreChapters || Number(offset) <= 0))

  const handleClick = async () => {
    if (!chapter) {
      // Nếu không có chapter, tăng/giảm offset và lấy danh sách chapter mới
      if (direction === 'next' && Number(offset) < total && hasMoreChapters) {
        const newOffset = Number(offset) + limit
        try {
          const chaptersData = await queryClient.fetchQuery(
            getChaptersByMangaId({
              id: mangaId,
              offset: newOffset,
              limit,
              order,
              lang: Array.isArray(langFilterValue) ? langFilterValue : [langFilterValue]
            })
          )

          if (chaptersData?.data?.length) {
            // Chọn chapter đầu tiên (hoặc cuối cùng nếu order là desc)
            const selectedChapter =
              order === 'asc' ? chaptersData.data[0] : chaptersData.data[chaptersData.data.length - 1]
            router.push(
              `/reader/${selectedChapter.id}?mangaId=${mangaId}&offset=${newOffset}&chapterId=${selectedChapter.id}&number=${selectedChapter.attributes.chapter}&lang=${getLanguageName(selectedChapter.attributes.translatedLanguage)}&langFilter=${langFilterValue}&langValue=${langValue}&order=${order}`,
              { scroll: false }
            )
          }
        } catch (error) {
          console.error('Error fetching chapters:', error)
        }
      } else if (direction === 'prev' && Number(offset) > 0 && hasMoreChapters) {
        const newOffset = Number(offset) - limit
        try {
          const chaptersData = await queryClient.fetchQuery(
            getChaptersByMangaId({
              id: mangaId,
              offset: newOffset,
              limit,
              order,
              lang: Array.isArray(langFilterValue) ? langFilterValue : [langFilterValue]
            })
          )

          if (chaptersData?.data?.length) {
            const selectedChapter =
              order === 'asc' ? chaptersData.data[0] : chaptersData.data[chaptersData.data.length - 1]
            router.push(
              `/reader/${selectedChapter.id}?mangaId=${mangaId}&offset=${newOffset}&chapterId=${selectedChapter.id}&number=${selectedChapter.attributes.chapter}&lang=${getLanguageName(selectedChapter.attributes.translatedLanguage)}&langFilter=${langFilterValue}&langValue=${langValue}&order=${order}`,
              { scroll: false }
            )
          }
        } catch (error) {
          console.error('Error fetching chapters:', error)
        }
      }
      return
    }

    // Nếu có chapter, chuyển đến chapter trước/sau
    router.push(
      `/reader/${chapter.id}?mangaId=${mangaId}&offset=${offset}&chapterId=${chapter.id}&number=${chapter.attributes.chapter}&lang=${getLanguageName(chapter.attributes.translatedLanguage)}&langFilter=${langFilterValue}&langValue=${langValue}&order=${order}`,
      { scroll: false }
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isDisabled
          ? 'bg-gray-600 cursor-not-allowed'
          : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 hover:shadow-lg transform hover:-translate-y-0.5'
      }`}
    >
      {direction === 'prev' && (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
        </svg>
      )}
      {direction === 'prev' ? 'Chapter Trước' : 'Chapter Sau'}
      {direction === 'next' && (
        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
        </svg>
      )}
    </button>
  )
}

export default ChapterNavButton
