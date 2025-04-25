'use client'

import { getTopMangaByTagId } from '@/api/Manga/getTopMangabyTagId'
import Loading from '@/component/status/Loading'
import { useQuery } from '@tanstack/react-query'
import MangaItems from '@/component/manga/manga-items'
import Pagination from '@/component/pagination'
import { useSearchParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import Error from '@/component/status/error'

interface MangaByTagPageProps {
  id?: string[]
  publicationDemographic?: string
  pagination?: boolean
}

export default function MangaByTagPage({ id, publicationDemographic, pagination = true }: MangaByTagPageProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const limit = 20
  const offset = useMemo(() => parseInt(searchParams.get('offset') || '0', 10), [searchParams])
  const setOffset = (newOffset: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('offset', newOffset.toString())
    router.push(`?${params.toString()}`)
  }
  const {
    data: top,
    isLoading,
    isError
  } = useQuery(
    getTopMangaByTagId({ id: id, publicationDemographic: publicationDemographic, offset: offset, limit: limit })
  )

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4'>
      {/* <h2 className='text-2xl font-semibold text-gray-100 mb-6'>Top Manga Shounen</h2> */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 sm:gap-5 gap-3 p-3 w-full [grid-template-columns:repeat(auto-fill,minmax(120px,1fr))] sm:[grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]'>
        {top?.data?.slice(0, top.data.length).map((manga, index) => (
          <div key={index} className='min-h-[140px] sm:max-h-[450px] w-full relative overflow-visible sm:flex  '>
            <MangaItems manga={manga} />
          </div>
        ))}
      </div>
      {pagination && (
        <div>
          <Pagination
            total={top?.total || 0}
            offset={offset}
            limit={limit}
            onPageChange={newOffset => setOffset(newOffset)}
          />
        </div>
      )}
    </div>
  )
}
