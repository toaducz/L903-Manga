'use client';

import Image from "next/image";
import { useQuery } from '@tanstack/react-query'
import { getMangaById } from "@/api/Manga/getMangaById";
import { Text, Page } from "zmp-ui";
import MangaDetailPage from "@/page/MangaDetailPage";

export default function Home() {

  const id = "8f3e1818-a015-491d-bd81-3addc4d7d56a"
  const { data: manga, isFetching, isSuccess } = useQuery(getMangaById({ id }))

  if(isFetching) {
    return <div>Loading...</div>
  }

  if(isSuccess) {
    console.log(manga?.data)
  }

  return (
    
    <Page>
      <MangaDetailPage manga={manga?.data} />
     </Page>
  );
}
