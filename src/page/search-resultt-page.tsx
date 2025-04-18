'use client'

import { searchManga } from '@/api/Manga/searchManga'
import Loading from '@/component/Loading'
import { useQuery } from '@tanstack/react-query'
import MangaItems from '@/component/manga-items'
import Pagination from '@/component/pagination'
import { useSearchParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'

interface SearchProps {
  title: string
}

export default function SearchResultPage({ title }: SearchProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const limit = 20
  const offset = useMemo(() => parseInt(searchParams.get('offset') || '0', 10), [searchParams])
  const setOffset = (newOffset: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('offset', newOffset.toString())
    router.push(`?${params.toString()}`)
  }
  const { data: result, isLoading } = useQuery(searchManga({ title: title, offset: offset, limit: limit }))

  if (isLoading) {
    return <Loading />
  }

  if (!result?.data) {
    return <div>méo có gì</div>
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4'>
      <div className='pt-20'>
        <h2 className='text-2xl font-semibold text-gray-100 mb-6'>Kết quả tìm kiếm cho: {title}</h2>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-3'>
        {result?.data?.slice(0, result.data.length).map((manga, index) => <MangaItems key={index} manga={manga} />)}
      </div>
      <div>
        {/* Danh sách manga render ở đây */}

        <Pagination
          total={result?.total || 0}
          offset={offset}
          limit={limit}
          onPageChange={newOffset => setOffset(newOffset)}
        />
      </div>
    </div>
  )
}
