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
      type: string
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

export type NewChapter = {
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
  relationships: Array<
    | {
        id: string
        type: 'scanlation_group' | 'user'
      }
    | {
        id: string
        type: 'manga'
        attributes: {
          title: Record<string, string>
          altTitles: Array<Record<string, string>>
          description: Record<string, string>
          isLocked: boolean
          links: Record<string, string>
          originalLanguage: string
          lastVolume: string
          lastChapter: string
          publicationDemographic: string
          status: string
          year: number
          contentRating: string
          tags: Array<{
            id: string
            type: 'tag'
            attributes: {
              name: Record<string, string>
              description: Record<string, string>
              group: string
              version: number
            }
            relationships: unknown[]
          }>
          state: string
          chapterNumbersResetOnNewVolume: boolean
          createdAt: string
          updatedAt: string
          version: number
          availableTranslatedLanguages: string[]
          latestUploadedChapter: string
        }
      }
  >
}

interface GetChaptersByMangaIdParams {
  id: string
  offset?: number
  limit?: number
  order?: string
  lang?: string[]
  include?: string
}

export const getChaptersByMangaId = ({
  id,
  offset = 0,
  limit = 20,
  order = 'asc',
  lang = ['vi', 'en'],
  include = 'scanlation_group'
}: GetChaptersByMangaIdParams) => {
  return queryOptions({
    queryKey: ['chapters-by-manga-id', id, offset, order, lang],
    queryFn: () =>
      request<DataResponse<Chapter>>(`/manga/${id}/feed`, 'GET', {
        limit: limit,
        offset: offset,
        'translatedLanguage[]': lang,
        'order[chapter]': order,
        'includes[]': include
      })
  })
}

interface NewChapterParams {
  offset?: number
  limit?: number
}

export const getChapters = ({ offset, limit }: NewChapterParams) => ({
  queryKey: ['get-chapters-new', offset, limit],
  queryFn: () =>
    request<DataResponse<NewChapter>>(`/chapter`, 'GET', {
      limit,
      offset,
      'translatedLanguage[]': ['vi'],
      'order[publishAt]': 'desc',
      'includes[]': 'manga'
    })
})
