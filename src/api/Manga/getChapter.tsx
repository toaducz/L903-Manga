import { queryOptions } from '@tanstack/react-query'
import { request } from '@/utils/request'
import { DataResponse } from '../paginate'

export type Chapter = {
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
  relationships: ChapterRelationship[]
}

type ChapterRelationship =
  | {
      id: string
      type: 'scanlation_group'
      attributes: {
        name: string
        altNames: string[]
        locked: boolean
        website: string | null
        ircServer: string | null
        ircChannel: string | null
        discord: string | null
        contactEmail: string | null
        description: string | null
        twitter: string | null
        mangaUpdates: string | null
        focusedLanguages: string[]
        official: boolean
        verified: boolean
        inactive: boolean
        publishDelay: string | null
        exLicensed: boolean
        createdAt: string
        updatedAt: string
        version: number
      }
    }
  | {
      id: string
      type: 'manga'
      attributes?: undefined
    }
  | {
      id: string
      type: 'user'
      attributes?: undefined
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
        'order[chapter]': order,
        'includes[]': 'scanlation_group'
      })
  })
}
