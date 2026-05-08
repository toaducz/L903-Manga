'use client'

import { getTopMangaByTagId } from '@/codebase/api/manga/get-top-manga-by-tag-id'
import Loading from '@/components/status/Loading'
import { useQuery } from '@tanstack/react-query'
import MangaItems from '@/components/manga/manga-items'
import Pagination from '@/components/common/pagination'
import { useSearchParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import Error from '@/components/status/error'

interface MangaByTagPageProps {
  id?: string[]
  publicationDemographic?: string
  pagination?: boolean
  limitManga?: number
}

export default function MangaByTagPage({
  id,
  publicationDemographic,
  pagination = true,
  limitManga = 20
}: MangaByTagPageProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const limit = limitManga ?? 20
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
    <div className='flex flex-col items-center justify-center p-4 w-full'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 w-full max-w-screen-2xl'>
        {top?.data?.map((manga, index) => (
          <MangaItems key={index} manga={manga} isResponsive={false} />
        ))}
      </div>
      {pagination && (
        <div className='w-full'>
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
