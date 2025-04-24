// components/SlideMangaCard.tsx
'use client'

import React from 'react'
import MangaItems from '../manga-items'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { useQuery } from '@tanstack/react-query'
import Loading from '../Loading'
import Error from '../error'
import { getTopMangaByTagId } from '@/api/Manga/getTopMangabyTagId'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Props {
  id?: string
  publicationDemographic?: string
}

const SlideMangaCard: React.FC<Props> = ({ id, publicationDemographic }) => {
  const {
    data: newManga,
    isLoading,
    isError
  } = useQuery(getTopMangaByTagId({ id: id, offset: 0, limit: 10, publicationDemographic: publicationDemographic }))

  console.log('newManga', newManga)

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={'auto'}
      spaceBetween={16}
      navigation
      // loop
      pagination={{ clickable: true }}
      className='pb-4 pt-25'
      autoplay={{ delay: 5000, disableOnInteraction: false }}
    >
      {newManga?.data.map(manga => (
        <SwiperSlide key={manga.id} style={{ width: '300px' }}>
          <MangaItems manga={manga} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SlideMangaCard
