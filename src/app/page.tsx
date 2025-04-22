'use client'

import Navbar from '@/component/navbar'
import { RecoilRoot } from 'recoil'
import MangaByTagPage from '@/page/manga-by-tag-page'
import { Suspense } from 'react'
import Loading from '@/component/Loading'

export default function Home() {
  const id = '07251805-a27e-4d59-b488-f0bfbec15168'

  return (
    <RecoilRoot>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <MangaByTagPage id={id} />
      </Suspense>
    </RecoilRoot>
  )
}
