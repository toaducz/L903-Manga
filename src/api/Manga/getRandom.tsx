import { request } from '@/utils/request'
import { Manga, Detail } from '../paginate'
import { queryOptions } from '@tanstack/react-query'

type random = {
  random: string
}

export const getRandom = ({ random }: random) => {
  return queryOptions({
    queryKey: ['get-random', random],
    queryFn: () =>
      request<Detail<Manga>>(`manga/random`, 'GET', {
        'includes[]': 'cover_art'
      })
  })
}
