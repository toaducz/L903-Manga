import { request } from '@/utils/request'
import { Manga, DataResponse } from '../paginate'
import { queryOptions } from '@tanstack/react-query'

type SearchRequest = {
  title: string
  offset: number
  limit: number
}

export const searchManga = ({ title, offset, limit }: SearchRequest) => {
  return queryOptions({
    queryKey: ['search', offset, title],
    queryFn: () =>
      request<DataResponse<Manga>>(`manga/`, 'GET', {
        title: title,
        'order[followedCount]': 'desc',
        limit: limit,
        'availableTranslatedLanguage[]': 'en',
        'includes[]': 'cover_art',
        offset: offset
      })
    // staleTime: 60 * 60
  })
}
