'use client'

import { Suspense, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getMangaById } from '@/api/Manga/getMangaById'
import MangaDetailPage from '@/page/manga-detail-page'
import Loading from '@/component/status/Loading'
import Error from '@/component/status/error'

export default function MangaDetailPageWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      <MangaDetailContent />
    </Suspense>
  )
}

function MangaDetailContent() {
  const params = useParams()
  const id = params.id as string

  const [isVisible, setIsVisible] = useState(false)

  const { data: manga, isFetching, isSuccess, isError } = useQuery(getMangaById({ id }))

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 10)
      return () => clearTimeout(timer)
    }
  }, [isSuccess])

  if (isFetching) return <Loading />

  if (isError) return <Error />

  if (!manga?.data) {
    return <Error message='Không tìm thấy truyện' />
  }

  // if(isSuccess) console.log(manga?.data)

  return (
    <div
      className={`transition-all duration-500 ease-in-out transform bg-black ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-2'
      }`}
    >
      <MangaDetailPage manga={manga.data} />
    </div>
  )
}
