import { request } from '@/utils/request'
import { Manga, DataResponse } from '../paginate'
import { queryOptions } from '@tanstack/react-query'
import { CommonRequest } from '../common'

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

export const getNewManga = ({ offset = 0, limit = 10 }: CommonRequest) => {
  return queryOptions({
    queryKey: ['get-new-manga', offset],
    queryFn: () =>
      request<DataResponse<Manga>>(`manga/`, 'GET', {
        'order[followedCount]': 'desc',
        limit: limit,
        'availableTranslatedLanguage[]': 'en',
        'includes[]': 'cover_art',
        offset: offset,
        'order[latestUploadedChapter]': 'desc'
      })
    // staleTime: 60 * 60
  })
}
