import { queryOptions } from '@tanstack/react-query'
import { request } from '@/utils/request'
import { DataResponse } from '../paginate'

export interface Chapter {
  id: string
  type: 'chapter'
  attributes: {
    volume: string | null
    chapter: string | null
    title: string | null
    translatedLanguage: string
    externalUrl: string | null
    publishAt: string
    readableAt: string
    createdAt: string
    updatedAt: string
    pages: number
    version: number
  }
  relationships: Relationship[]
}

export interface Relationship {
  id: string
  type: 'scanlation_group' | 'manga' | 'user'
}

interface GetChaptersByMangaIdParams {
  id: string
  offset?: number
  limit?: number
  order?: string
  lang?: string[]
}

export const getChaptersByMangaId = ({
  id,
  offset = 0,
  limit = 20,
  order = 'asc',
  lang = ['vi', 'en']
}: GetChaptersByMangaIdParams) => {
  return queryOptions({
    queryKey: ['chapters-by-manga-id', id, offset, order, lang],
    queryFn: () =>
      request<DataResponse<Chapter>>(`/manga/${id}/feed`, 'GET', {
        limit,
        offset,
        'translatedLanguage[]': lang,
        'order[chapter]': order
      })
  })
}
