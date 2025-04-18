import { request } from "@/utils/request";
import { Manga, Detail } from "../paginate";
import { queryOptions } from '@tanstack/react-query'

type MangaByIdRequest = {
    id: string
}

export const getMangaById = ({ id }: MangaByIdRequest) => {
    return queryOptions({
        queryKey: ['get-manga-by-id'],
        queryFn: () =>
            request<Detail<Manga>>(`manga/${id}`, 'GET', {
                "includes[]": "cover_art"
            }),
        staleTime: 60 * 60 * 10
    })
}