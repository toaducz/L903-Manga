import { useQueries } from '@tanstack/react-query'
import { useState, useMemo } from 'react'
import { getMangaById } from '@/api/Manga/getMangaById'
import { Manga } from '@/api/paginate'
import MangaItems from './manga-items'
import Loading from '../status/Loading'

type RelatedMangaProps = {
  ids: string[]
}

export default function RelatedManga({ ids }: RelatedMangaProps) {
  const pageSize = 20
  const [page, setPage] = useState(0)
  const [selectedRating, setSelectedRating] = useState<'all' | 'hide-pornographic'>('hide-pornographic')

  const totalPages = Math.ceil(ids.length / pageSize)

  const currentIds = useMemo(() => {
    return ids.slice(page * pageSize, (page + 1) * pageSize)
  }, [ids, page])

  const mangaQueries = useQueries({
    queries: currentIds.map(id => getMangaById({ id }))
  })

  // console.log(mangaQueries)

  const isLoading = mangaQueries.some(query => query.isLoading)
  const isError = mangaQueries.some(query => query.isError)

  const mangaList = mangaQueries.filter(query => query.data).map(query => query.data!.data as Manga)

  const displayedManga = mangaList.filter(manga => {
    if (!manga || !manga.attributes) return false // Nếu manga bị undefined/null thì loại bỏ, có mấy cái vì lý do gì đó không có tag :V
    if (selectedRating === 'all') return true
    return manga.attributes.contentRating !== 'pornographic'
  })

  // console.log(displayedManga)

  if (currentIds.length === 0) {
    return (
      <div className='w-full h-full flex items-center justify-center py-10'>
        <p className='text-gray-500 text-lg'>Không có manga liên quan</p>
      </div>
    )
  }

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <div>{`Lỗi rồi :(`}</div>
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <select
            value={selectedRating}
            onChange={e => setSelectedRating(e.target.value as 'all' | 'hide-pornographic')}
            className='p-2 rounded-md bg-gray-800 text-white mb-4'
          >
            <option value='all'>Hiện tất cả</option>
            <option value='hide-pornographic'>Ẩn 18+</option>
          </select>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 sm:gap-5 gap-3 p-3 w-full [grid-template-columns:repeat(auto-fill,minmax(120px,1fr))] sm:[grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]'>
            {displayedManga.length > 0 ? (
              displayedManga.map((manga, index) => (
                <div key={index} className='min-h-[140px] sm:max-h-[450px] w-full relative overflow-visible sm:flex'>
                  <MangaItems manga={manga} />
                </div>
              ))
            ) : (
              <div className='text-gray-400 text-center col-span-full'>Không có manga phù hợp</div>
            )}
          </div>

          <div className='flex justify-center gap-4 mt-6'>
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 0))}
              disabled={page === 0}
              className='px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50'
            >
              Previous
            </button>

            <span className='text-white flex items-center'>
              Trang {page + 1} / {totalPages}
            </span>

            <button
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
              disabled={page >= totalPages - 1}
              className='px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50'
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  )
}
