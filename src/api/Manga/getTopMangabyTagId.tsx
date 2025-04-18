import { request } from '@/utils/request'
import { Manga, DataResponse } from '../paginate'
import { queryOptions } from '@tanstack/react-query'

type TopMangaByTagIdRequest = {
  id: string
  offset: number
  limit: number
}

export const getTopMangaByTagId = ({ id, offset, limit }: TopMangaByTagIdRequest) => {
  return queryOptions({
    queryKey: ['get-top-manga-by-tag-id', offset],
    queryFn: () =>
      request<DataResponse<Manga>>(`manga/`, 'GET', {
        'includedTags[]': id,
        'order[followedCount]': 'desc',
        limit: limit,
        'availableTranslatedLanguage[]': 'en',
        'includes[]': 'cover_art',
        offset: offset
      })
    // staleTime: 60 * 60
  })
}
