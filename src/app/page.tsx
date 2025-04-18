'use client'

import Navbar from '@/component/navbar'
import { RecoilRoot } from 'recoil'
import MangaByTagPage from '@/page/manga-by-tag-page'

export default function Home() {
  const id = '07251805-a27e-4d59-b488-f0bfbec15168'

  // if (isSuccess) {
  //   console.log(top)
  // }

  return (
    <RecoilRoot>
      <Navbar />
      <MangaByTagPage id={id} />
    </RecoilRoot>
  )
}
