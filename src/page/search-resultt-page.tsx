'use client'

import { searchManga } from '@/api/Manga/searchManga'
import Loading from '@/component/status/Loading'
import { useQuery } from '@tanstack/react-query'
import MangaItems from '@/component/manga/manga-items'
import Pagination from '@/component/pagination'
import { useSearchParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'
import Error from '@/component/status/error'

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
  const { data: result, isLoading, isError } = useQuery(searchManga({ title: title, offset: offset, limit: limit }))

  console.log(result?.data)
  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  if (result?.data.length === 0) {
    const mess = 'Kết quả tìm kiếm cho:' + title + ' là không có'
    return (
      <div>
        <Error message={mess} />
      </div>
    )
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4'>
      <div className='pt-20'>
        <h2 className='text-2xl font-semibold text-gray-100 mb-6'>Kết quả tìm kiếm cho: {title}</h2>
      </div>
      <div className='flex justify-center items-center '>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 sm:gap-5 gap-3 p-3 w-full [grid-template-columns:repeat(auto-fill,minmax(120px,1fr))] sm:[grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]'>
          {result?.data?.slice(0, result.data.length).map((manga, index) => (
            <div key={index} className='min-h-[140px] sm:max-h-[450px] w-full relative overflow-visible sm:flex  '>
              <MangaItems manga={manga} />
            </div>
          ))}
        </div>
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
