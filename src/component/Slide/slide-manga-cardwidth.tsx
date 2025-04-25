'use client'

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { contentRatingColors } from '@/utils/static'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getNewManga } from '@/api/Manga/searchManga'
import Loading from '../status/Loading'
import Error from '../status/error'
import { MangaStatus, OriginalLanguage, ContentRating } from '@/utils/enums'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Props {
  id: string
}

const SlideMangaCardFullWidth: React.FC<Props> = ({ id }) => {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const { data: newManga, isLoading, isError } = useQuery(getNewManga({ limit: 100 }))

  console.log(id)

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  return (
    <div className='w-full'>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop
        // navigation
        autoplay={{ delay: 3500 }}
      // pagination={{ clickable: true }}
      >
        {newManga?.data.map(manga => {
          const attr = manga.attributes
          const title = attr.altTitles.find(t => t.vi)?.vi ?? attr.title.en ?? attr.altTitles.find(t => t.en)?.en
          const altTitle = attr.altTitles.find(t => t.en)?.en || attr.altTitles.find(t => t.ja)?.ja
          const year = attr.year || 'Không rõ'
          const status = MangaStatus[attr.status as keyof typeof MangaStatus] || 'Không rõ'
          const originalLang = OriginalLanguage[attr.originalLanguage as keyof typeof OriginalLanguage] || 'Không rõ'
          const rating = attr.contentRating as keyof typeof ContentRating
          const coverArt = manga.relationships.find(rel => rel.type === 'cover_art')
          const coverImageUrl = coverArt?.attributes?.fileName
            ? `/api/image?url=${encodeURIComponent(
              `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}`
            )}`
            : '/no-image.jpg'
          const tags = attr.tags.map(tag => tag.attributes.name.en)
          const handleClick = () => {
            if (manga.id.trim()) {
              router.push(`/manga-detail/${manga.id.trim()}`)
            }
          }

          return (
            <SwiperSlide key={manga.id}>
              <div
                className='relative flex flex-col md:flex-row items-center mb:bg-slate-800 md:items-start w-full max-h-[28rem] text-white px-6 py-8 gap-6 overflow-hidden cursor-pointer'
                onClick={handleClick}
              >
                {/* Background blurred image */}
                {coverImageUrl ? (
                  <div className='absolute inset-0 -z-10'>
                    <Image
                      src={coverImageUrl}
                      alt={`${title}-background`}
                      fill
                      className='object-cover blur-lg opacity-80 bg-slate-800'
                      sizes='100vw'
                    />
                    <div className='absolute inset-0 bg-black/60'></div>
                  </div>
                ) : (
                  <div className='absolute inset-0 -z-10 bg-slate-800'></div>
                )}
                {/* Left Content */}
                <div className={`w-full md:w-[300px] h-[25rem] relative flex-shrink-0 `}>
                  {!isLoaded && (
                    <div className='absolute inset-0 flex items-center justify-center bg-gray-900 animate-pulse rounded shadow-lg'>
                      <Loading />
                    </div>
                  )}
                  <Image
                    src={coverImageUrl}
                    alt={title}
                    onLoad={() => setIsLoaded(false)}
                    fill
                    sizes='(max-height: 40vh)'
                    className={`object-cover rounded-xl shadow-md ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
                  />
                </div>

                <div className='flex-1 space-y-3 max-w-xl z-10'>
                  <h2 className='text-3xl font-bold'>{title}</h2>
                  {altTitle && <p className='italic text-gray-300'>{altTitle}</p>}

                  <div className='text-sm space-y-1'>
                    <p>
                      <span className='font-semibold'>Tình trạng:</span> {status}
                    </p>
                    <p>
                      <span className='font-semibold'>Năm phát hành:</span> {year}
                    </p>
                    <p>
                      <span className='font-semibold'>Ngôn ngữ gốc:</span> {originalLang}
                    </p>
                    <p>
                      <span className='font-semibold'>Độ tuổi:</span>{' '}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${contentRatingColors[rating]}`}>
                        {ContentRating[rating]}
                      </span>
                    </p>
                  </div>

                  <div className='flex flex-wrap gap-2 pt-2'>
                    {tags.map((tag, index) => (
                      <span key={index} className='bg-blue-600 px-3 py-1 text-xs rounded-full'>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>

          )
        })}
      </Swiper>
    </div>
  )
}

export default SlideMangaCardFullWidth
