import { request } from '@/utils/request'
import { queryOptions } from '@tanstack/react-query'
import { DataResponse } from '../paginate'
import { CommonRequest } from '../common'

type Cover = {
  id: string
  type: string
  attributes: {
    description: string
    volume: string
    fileName: string
    locale: string
    createdAt: string
    updatedAt: string
    version: number
  }
  relationships: Array<{
    id: string
    type: string
  }>
}

export const getCover = ({ offset = 0, limit = 1, id }: CommonRequest) => {
  return queryOptions({
    queryKey: ['get-cover', offset, id],
    queryFn: () =>
      request<DataResponse<Cover>>(`cover`, 'GET', {
        // 'includes[]': 'cover_art'
        limit: limit,
        offset: offset,
        'manga[]': id, // chổ này nhận vào 1 string[], tôi lười
        'order[updatedAt]': 'asc',
        'order[volume]': 'asc'
      })
  })
}
