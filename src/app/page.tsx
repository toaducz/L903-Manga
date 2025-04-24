'use client'

import Navbar from '@/component/navbar'
import { RecoilRoot } from 'recoil'
import MangaByTagPage from '@/page/manga-by-tag-page'
import { Suspense } from 'react'
import Loading from '@/component/Loading'
import SlideMangaCard from '@/component/Slide/slide-manga-card'
import SlideMangaCardFullWidth from '@/component/Slide/slide-manga-cardwidth'

export default function Home() {
  // const thiller = '07251805-a27e-4d59-b488-f0bfbec15168'
  const oneshot = '0234a31e-a729-4e28-9d6a-3f87c4966b9e'

  return (
    <RecoilRoot>
      <Navbar />

      <Suspense fallback={<Loading />}>
        <div className='pt-25'>
          <SlideMangaCardFullWidth id={''} />
        </div>
        <MangaByTagPage publicationDemographic={'shounen'} />
        <div className='pt-15 flex flex-col items-center justify-center p-4'>
          <h2 className='text-2xl font-semibold text-gray-100 mb-6'>Seinen</h2>
        </div>
        <div className='py-15'>
          <SlideMangaCard publicationDemographic={'seinen'} />
        </div>
        <div className='pt-15 flex flex-col items-center justify-center p-4'>
          <h2 className='text-2xl font-semibold text-gray-100 mb-6'>Shoujo</h2>
        </div>
        <div className='py-15'>
          <SlideMangaCard publicationDemographic={'shoujo'} />
        </div>
        <div className='pt-15 flex flex-col items-center justify-center p-4'>
          <h2 className='text-2xl font-semibold text-gray-100 mb-6'>Oneshot</h2>
        </div>
        <div className='py-15'>
          <SlideMangaCard id={oneshot} />
        </div>
      </Suspense>
    </RecoilRoot>
  )
}
