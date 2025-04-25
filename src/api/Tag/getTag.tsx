import { request } from '@/utils/request'
import { DataResponse } from '../paginate'
import { queryOptions } from '@tanstack/react-query'

export type Tag = {
  id: string
  type: 'tag'
  attributes: {
    name: {
      en: string
    }
    description: {
      [key: string]: string
    }
    group: 'genre' | 'theme' | 'format' | string
    version: number
  }
  // relationships: any[]
}

export const getTag = () => {
  return queryOptions({
    queryKey: ['get-tag'],
    queryFn: () => request<DataResponse<Tag>>(`manga/tag`)
    // staleTime: 60 * 60
  })
}
