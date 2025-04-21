'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getChapterImages } from '@/api/Manga/getChapterImages'
import Loading from '@/component/Loading'
import Image from 'next/image'
import { useState } from 'react'
import Error from '@/component/error'
import MangaChaptersList from '@/component/manga-chapter-list'
import ScrollToBottomButton from '@/component/scroll-to-bottom'
// import { getChaptersByMangaId } from '@/api/Manga/getChapter'

const ChapterReaderPage = () => {
  const params = useParams()
  const searchParams = useSearchParams()

  const id = params.id
  const mangaId = searchParams.get('mangaId') ?? ''
  const offset = searchParams.get('offset') ?? 0
  const chapterId = searchParams.get('chapterId') ?? ''
  const number = searchParams.get('number') ?? 'N/A'
  const lang = searchParams.get('lang') ?? 'en'
  const langFilterValue = searchParams.get('langFilter') ?? ['vi', 'en']
  const langValue = searchParams.get('langValue') ?? 'all'
  const order = searchParams.get('order') ?? 'asc'

  const { data, isLoading, error } = useQuery({
    queryKey: ['chapter-images', id],
    queryFn: () => getChapterImages(id as string),
    enabled: !!id
  })

  if (isLoading) return <Loading />
  if (data.chapter.data.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center space-y-0.5 pt-15'>
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
      <div className='flex flex-col items-center gap-6 px-4 pb-8 pt-10'>
        {data.chapter.data.map((filename: string, index: number) => (
          <ImageWithLoading
            key={index}
            src={`${data.baseUrl}/data/${data.chapter.hash}/${filename}`}
            alt={`Trang ${index + 1}`}
          />
        ))}
      </div>
      <MangaChaptersList
        mangaId={mangaId}
        offsetParams={Number(offset)}
        chapterId={chapterId}
        langFilterValue={langFilterValue}
        langValue={langValue}
        order={order}
      />
      <ScrollToBottomButton />
    </div>
  )
}

export default ChapterReaderPage

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
          className={` rounded shadow-lg transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    </div>
  )
}
