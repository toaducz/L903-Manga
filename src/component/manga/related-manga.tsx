import { useQueries } from '@tanstack/react-query'
import { getMangaById } from '@/api/Manga/getMangaById'
import { Manga } from '@/api/paginate'
import MangaItems from './manga-items'
import Loading from '../status/Loading'

type RelatedMangaProps = {
  ids: string[]
}

export default function RelatedManga({ ids }: RelatedMangaProps) {
  const mangaQueries = useQueries({
    queries: ids.map(id => getMangaById({ id }))
  })

  if (mangaQueries.length === 0) {
    return (
      <div className='w-full h-full flex items-center justify-center py-10'>
        <p className='text-gray-500 text-lg'>Không có manga liên quan</p>
      </div>
    )
  }

  const isLoading = mangaQueries.some(query => query.isLoading)
  const isError = mangaQueries.some(query => query.isError)

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <div>Đã có lỗi xảy ra khi tải manga liên quan.</div>
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 sm:gap-5 gap-3 p-3 w-full [grid-template-columns:repeat(auto-fill,minmax(120px,1fr))] sm:[grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]'>
      {mangaQueries
        .filter(query => query.data)
        .map((query, index) => (
          <div key={index} className='min-h-[140px] sm:max-h-[450px] w-full relative overflow-visible sm:flex'>
            <MangaItems manga={query?.data?.data as Manga} />
          </div>
        ))}
    </div>
  )
}
