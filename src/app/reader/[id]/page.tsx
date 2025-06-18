'use client'

import { Suspense, useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getChapterImages } from '@/api/Manga/getChapterImages'
import Loading from '@/component/status/Loading'
import { ImageWithLoading } from '@/component/image/image-with-loading'
import Error from '@/component/status/error'
import MangaChaptersList from '@/component/manga/manga-chapter-list'
import ScrollToBottomButton from '@/component/scroll/scroll-to-bottom'
import { getChaptersByMangaId } from '@/api/Manga/getChapter'
import ChapterNavButton from '@/component/chapter-navigation'
import { useRouter } from 'next/navigation'
import { saveReadingHistory } from '@/utils/localStorage'
import { Chapter } from '@/api/Manga/getChapter'
import { getMangaById } from '@/api/Manga/getMangaById'

export default function ChapterReaderPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ReaderContent />
    </Suspense>
  )
}

function ReaderContent() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const [showChapters, setShowChapters] = useState(false)
  const offset = Number(searchParams.get('offset') ?? 0)
  const id = params.id as string
  const mangaId = searchParams.get('mangaId') ?? ''
  const chapterId = searchParams.get('chapterId') ?? ''
  const number = searchParams.get('number') ?? 'Oneshot'
  const lang = searchParams.get('lang') ?? ''
  const langFilterValue = searchParams.get('langFilter') ?? ['vi', 'en']
  const langValue = searchParams.get('langValue') ?? 'all'
  const order = searchParams.get('order') ?? 'asc'

  const {
    data: images,
    isLoading,
    error,
    isError,
    isSuccess
  } = useQuery({
    queryKey: ['chapter-images', id, offset],
    queryFn: () => getChapterImages(id),
    enabled: !!id
  })

  // console.log(images)

  const { data: chaptersData } = useQuery(
    getChaptersByMangaId({
      id: mangaId,
      lang: Array.isArray(langFilterValue) ? langFilterValue : [langFilterValue],
      order: order,
      offset: offset
    })
  )

  const { data: manga } = useQuery(getMangaById({ id: mangaId }))

  const title =
    manga?.data.attributes.altTitles.find(t => t.vi)?.vi ??
    manga?.data.attributes.altTitles.find(t => t.en)?.en ??
    manga?.data.attributes.altTitles.find(t => t.ja)?.ja

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  useEffect(() => {
    if (mangaId && chapterId && chaptersData?.data?.length && title) {
      saveReadingHistory(mangaId, chapterId, chaptersData?.data as Chapter[], title, number, lang)
    }
  }, [mangaId, chapterId, chaptersData, title, number, lang])

  const getPreviousAndNextChapter = () => {
    if (!chaptersData?.data || !chapterId) return { prevChapter: null, nextChapter: null }

    const chapters = chaptersData.data
    const currentIndex = chapters.findIndex(ch => ch.id === chapterId)

    if (currentIndex === -1) return { prevChapter: null, nextChapter: null }

    const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null
    const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null

    return { prevChapter, nextChapter }
  }

  const { prevChapter, nextChapter } = getPreviousAndNextChapter()

  const handleClick = (id: string) => {
    if (id) {
      router.push(`/manga-detail/${id.trim()}`)
    }
  }

  if (isLoading) return <Loading />
  if (!chaptersData?.data?.length && isSuccess) return <Error message='Không tìm thấy chapter!' />
  if (images?.chapter?.data?.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center space-y-0.5 pt-15'>
        <div className='flex justify-center gap-4 my-6'>
          <ChapterNavButton
            chapter={prevChapter}
            direction='prev'
            mangaId={mangaId}
            offset={String(offset)}
            langFilterValue={langFilterValue}
            langValue={langValue}
            order={order}
            limit={Number(chaptersData?.limit) ?? 20}
            total={Number(chaptersData?.total) ?? 100}
          />
          <ChapterNavButton
            chapter={nextChapter}
            direction='next'
            mangaId={mangaId}
            offset={String(offset)}
            langFilterValue={langFilterValue}
            langValue={langValue}
            order={order}
            limit={Number(chaptersData?.limit) ?? 20}
            total={Number(chaptersData?.total) ?? 100}
          />
        </div>
        <Error message='Chuyển trang hoặc thử lại nhé người anh em!!!' />
      </div>
    )
  }
  if (error) return <Error />

  if (isError) {
    return <Error message='Có gì đó sai sai?' />
  }

  return (
    <div>
      <div className='flex items-center justify-center px-4 pt-25'>
        <span className='font-bold text-4xl'>
          CHAPTER {number} {lang ?? 'Oneshot'}
        </span>
      </div>
      <div className=' flex items-center justify-center pt-5'>
        <button
          onClick={() => handleClick(mangaId)}
          className='flex items-center gap-2 px-6 p-3 text-white font-semibold bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-900 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          Quay lại trang chi tiết
        </button>
      </div>
      <div className='flex justify-center gap-4 my-6'>
        <ChapterNavButton
          chapter={prevChapter}
          direction='prev'
          mangaId={mangaId}
          offset={String(offset)}
          langFilterValue={langFilterValue}
          langValue={langValue}
          order={order}
          limit={Number(chaptersData?.limit) ?? 20}
          total={Number(chaptersData?.total) ?? 100}
        />
        <ChapterNavButton
          chapter={nextChapter}
          direction='next'
          mangaId={mangaId}
          offset={String(offset)}
          langFilterValue={langFilterValue}
          langValue={langValue}
          order={order}
          limit={Number(chaptersData?.limit) ?? 20}
          total={Number(chaptersData?.total) ?? 100}
        />
      </div>

      <div className='flex flex-col items-center gap-6 px-4 pb-8 pt-10'>
        {images.chapter.data.map((filename: string, index: number) => (
          <ImageWithLoading
            key={index}
            src={`/api/image?url=${encodeURIComponent(`${images.baseUrl}/data/${images.chapter.hash}/${filename}`)}`}
            alt={`Trang ${index + 1}`}
          />
        ))}
      </div>

      <div className='flex justify-center gap-4 my-6'>
        <ChapterNavButton
          chapter={prevChapter}
          direction='prev'
          mangaId={mangaId}
          offset={String(offset)}
          langFilterValue={langFilterValue}
          langValue={langValue}
          order={order}
          limit={Number(chaptersData?.limit) ?? 20}
          total={Number(chaptersData?.total) ?? 100}
        />
        <ChapterNavButton
          chapter={nextChapter}
          direction='next'
          mangaId={mangaId}
          offset={String(offset)}
          langFilterValue={langFilterValue}
          langValue={langValue}
          order={order}
          limit={Number(chaptersData?.limit) ?? 20}
          total={Number(chaptersData?.total) ?? 100}
        />
      </div>

      <div className='flex justify-center my-6 pb-3'>
        <button
          onClick={() => setShowChapters(prev => !prev)}
          className='flex items-center gap-2 px-6 p-3 text-white font-semibold bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-900 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          {showChapters ? 'Ẩn danh sách chương' : 'Hiện danh sách chương'}
        </button>
      </div>
      {showChapters && (
        <MangaChaptersList
          mangaId={mangaId}
          offsetParams={offset}
          chapterId={chapterId}
          langFilterValue={Array.isArray(langFilterValue) ? langFilterValue : [langFilterValue]}
          langValue={langValue}
          order={order}
        />
      )}
      <div className=' flex items-center justify-center pb-10'>
        <button
          onClick={() => handleClick(mangaId)}
          className='flex items-center gap-2 px-6 p-3 text-white font-semibold bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-900 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          Quay lại trang chi tiết
        </button>
      </div>

      <ScrollToBottomButton />
    </div>
  )
}
