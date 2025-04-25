// components/SlideMangaCard.tsx
'use client'

import React from 'react'
import MangaItems from '../manga/manga-items'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { useQuery } from '@tanstack/react-query'
import Loading from '../status/Loading'
import Error from '../status/error'
import { getTopMangaByTagId } from '@/api/Manga/getTopMangabyTagId'
import { useRouter } from 'next/navigation'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { motion } from 'framer-motion'

interface Props {
  id?: string[]
  publicationDemographic?: string
}

const SlideMangaCard: React.FC<Props> = ({ id, publicationDemographic }) => {
  const router = useRouter()
  const {
    data: newManga,
    isLoading,
    isError
  } = useQuery(getTopMangaByTagId({ id: id, offset: 0, limit: 10, publicationDemographic: publicationDemographic }))

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault()

    router.push(`/manga-page/${id}`)
  }

  // console.log('newManga', newManga)

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={'auto'}
        spaceBetween={16}
        navigation
        // pagination={{ clickable: true }}
        className='pb-4 pt-25'
        autoplay={{ delay: 5000, disableOnInteraction: false }}
      >
        {newManga?.data.map(manga => (
          <SwiperSlide key={manga.id} style={{ width: '300px' }}>
            <MangaItems manga={manga} isResponsive={false} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='text-left mt-4'>
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 rounded-lg hover:bg-blue-200 hover:text-blue-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
        >
          Xem thêm
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7' />
          </svg>
        </motion.button>
      </div>
    </div>
  )
}

export default SlideMangaCard
