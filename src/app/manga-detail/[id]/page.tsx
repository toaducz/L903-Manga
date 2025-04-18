'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMangaById } from '@/api/Manga/getMangaById'
import MangaDetailPage from '@/page/manga-detail-page'
import Loading from '@/component/Loading'

export default function MangaDetailPageWrapper() {
  const params = useParams()
  const id = params.id as string

  const [isVisible, setIsVisible] = useState(false)

  const { data: manga, isFetching, isSuccess } = useQuery(getMangaById({ id }))

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 10)
      return () => clearTimeout(timer)
    }
  }, [isSuccess])

  if (isFetching) return <Loading />

  if (!manga?.data) {
    return <p className='text-center text-red-500 mt-8'>Không tìm thấy manga</p>
  }

  return (
    <div
      className={`transition-all duration-500 ease-in-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-2'
      }`}
    >
      <MangaDetailPage manga={manga.data} />
    </div>
  )
}
