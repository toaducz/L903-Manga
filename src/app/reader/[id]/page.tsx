'use client'

import { Suspense, useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getChapterImages } from '@/api/Manga/getChapterImages'
import Loading from '@/component/Loading'
import Image from 'next/image'
import Error from '@/component/error'
import MangaChaptersList from '@/component/manga-chapter-list'
import ScrollToBottomButton from '@/component/scroll-to-bottom'
import { getChaptersByMangaId } from '@/api/Manga/getChapter'
import ChapterNavButton from '@/component/chapter-navigation'

export default function ChapterReaderPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ReaderContent />
    </Suspense>
  )
}

function ReaderContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [showChapters, setShowChapters] = useState(false)
  const offset = Number(searchParams.get('offset') ?? 0)
  const id = params.id as string
  const mangaId = searchParams.get('mangaId') ?? ''
  const chapterId = searchParams.get('chapterId') ?? ''
  const number = searchParams.get('number') ?? ''
  const lang = searchParams.get('lang') ?? ''
  const langFilterValue = searchParams.get('langFilter') ?? ['vi', 'en']
  const langValue = searchParams.get('langValue') ?? 'all'
  const order = searchParams.get('order') ?? 'asc'

  const { data, isLoading, error } = useQuery({
    queryKey: ['chapter-images', id, offset],
    queryFn: () => getChapterImages(id),
    enabled: !!id
  })

  const { data: chaptersData } = useQuery(
    getChaptersByMangaId({
      id: mangaId,
      lang: Array.isArray(langFilterValue) ? langFilterValue : [langFilterValue],
      order: order,
      offset: offset
    })
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

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

  if (isLoading) return <Loading />
  if (!chaptersData?.data?.length) return <Error message='Không tìm thấy chapter!' />
  if (data?.chapter?.data?.length === 0) {
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

  return (
    <div>
      <div className='flex items-center justify-center px-4 pt-25'>
        <span className='font-bold text-4xl'>
          CHAPTER {number} {lang}
        </span>
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
        {data.chapter.data.map((filename: string, index: number) => (
          <ImageWithLoading
            key={index}
            src={`${data.baseUrl}/data/${data.chapter.hash}/${filename}`}
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

      <div className='flex justify-center my-6 pb-10'>
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

      <ScrollToBottomButton />
    </div>
  )
}

const ImageWithLoading = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div>
      <div className='relative w-full max-w-screen-md min-h-[500px]'>
        {!isLoaded && (
          <div className='absolute inset-0 flex items-center justify-center bg-gray-900 animate-pulse rounded shadow-lg'>
            <Loading />
          </div>
        )}
        <Image
          src={src}
          alt={alt}
          width={800}
          height={1200}
          onLoad={() => setIsLoaded(true)}
          className={`rounded shadow-lg transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    </div>
  )
}
