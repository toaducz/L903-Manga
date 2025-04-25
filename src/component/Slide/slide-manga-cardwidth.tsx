'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { contentRatingColors } from '@/utils/static'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getNewManga } from '@/api/Manga/searchManga'
import Loading from '../Loading'
import Error from '../error'
import { MangaStatus, OriginalLanguage, ContentRating } from '@/utils/enums'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Props {
  id: string
}

const SlideMangaCardFullWidth: React.FC<Props> = ({ id }) => {
  const router = useRouter()

  const { data: newManga, isLoading, isError } = useQuery(getNewManga({ limit: 20 }))

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
        pagination={{ clickable: true }}
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
                className='flex flex-col md:flex-row items-center md:items-start w-full max-h-[28rem] bg-slate-900 text-white px-6 py-8 gap-6 overflow-hidden'
                onClick={handleClick}
              >
                {/* Left Content */}
                <div className='w-full md:w-[300px] h-[25rem] relative flex-shrink-0'>
                  <Image
                    src={coverImageUrl}
                    alt={title}
                    fill
                    sizes='(max-height: 40vh)'
                    className='object-cover rounded-xl shadow-md'
                  />
                </div>
                <div className='flex-1 space-y-3 max-w-xl'>
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

                {/* Right Image */}
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default SlideMangaCardFullWidth
