import { request } from '@/utils/request'
import { Manga, Detail } from '../paginate'
import { queryOptions } from '@tanstack/react-query'

type MangaByIdRequest = {
  id: string
}

export const getMangaById = ({ id }: MangaByIdRequest) => {
  return queryOptions({
    queryKey: ['get-manga-by-id', id],
    queryFn: () =>
      request<Detail<Manga>>(`manga/${id}`, 'GET', {
        'includes[]': 'cover_art',
        'contentRating[]': 'safe'
      })
  })
}
