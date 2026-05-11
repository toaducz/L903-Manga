'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getNewManga } from '@/codebase/api/manga/search-manga'
import Loading from '../status/Loading'
import Error from '../status/error'
import { MangaStatus } from '@/codebase/constants/enums'
import { motion } from 'framer-motion'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

interface Props {
  id?: string
}

const SlideMangaCardFullWidth: React.FC<Props> = ({ id }) => {
  const router = useRouter()
  const { data: newManga, isLoading, isError } = useQuery(getNewManga({ limit: 5 }))

  if (isLoading)
    return (
      <div className='h-[70vh] flex items-center justify-center'>
        <Loading />
      </div>
    )
  if (isError) return <Error />

  return (
    <div className='w-full rounded-3xl overflow-hidden shadow-2xl'>
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect='fade'
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        className='h-[70vh] md:h-[80vh]'
      >
        {newManga?.data.map(manga => {
          const attr = manga.attributes
          const title = attr.altTitles.find(t => t.vi)?.vi ?? attr.title.en ?? attr.altTitles.find(t => t.en)?.en
          const description = attr.description.en || attr.description.vi || 'No description available.'
          const coverArt = manga.relationships.find(rel => rel.type === 'cover_art')
          const coverImageUrl = coverArt?.attributes?.fileName
            ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}`
            : ''
          const proxyImageUrl = `/api/image?url=${encodeURIComponent(coverImageUrl)}`

          return (
            <SwiperSlide key={manga.id + id}>
              <div
                className='relative w-full h-full cursor-pointer group'
                onClick={() => router.push(`/manga-detail/${manga.id}`)}
              >
                {/* Background Art */}
                <Image
                  unoptimized
                  src={proxyImageUrl}
                  alt={'title' + title}
                  fill
                  priority
                  className='object-cover object-top group-hover:scale-105'
                />

                {/* Overlays */}
                <div className='absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent' />
                <div className='absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent' />

                {/* Content */}
                <div className='absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24'>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className='max-w-3xl'
                  >
                    <div className='flex items-center gap-3 mb-4'>
                      <span className='px-3 py-1 text-[10px] font-black tracking-widest uppercase rounded-full bg-primary text-primary-foreground neon-glow'>
                        Featured
                      </span>
                      <span className='text-xs font-bold text-white/60 uppercase tracking-widest'>
                        {MangaStatus[attr.status as keyof typeof MangaStatus]}
                      </span>
                    </div>

                    <h2 className='text-4xl md:text-6xl font-display font-black text-white mb-4 line-clamp-2 drop-shadow-lg leading-tight'>
                      {title}
                    </h2>

                    <p className='text-sm md:text-base text-gray-300 font-medium line-clamp-3 mb-8 opacity-90 max-w-xl'>
                      {description}
                    </p>

                    <div className='flex items-center gap-4'>
                      <button className='px-8 py-3 cursor-pointer bg-primary text-primary-foreground font-black rounded-full transition-all hover:scale-105 active:scale-95 neon-glow'>
                        Đọc Ngay
                      </button>
                      <button className='px-8 py-3 cursor-pointer bg-white/10 backdrop-blur-md border border-white/10 text-white font-bold rounded-full transition-all hover:bg-white/20'>
                        + Xem chi tiết
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          width: 10px;
          height: 10px;
        }
        .swiper-pagination-bullet-active {
          background: var(--primary);
          width: 24px;
          border-radius: 5px;
          box-shadow: 0 0 10px var(--primary);
        }
      `}</style>
    </div>
  )
}

export default SlideMangaCardFullWidth
