'use client'

import { RecoilRoot } from 'recoil'
// import MangaByTagPage from '@/page/manga-by-tag-page'
import { Suspense } from 'react'
import Loading from '@/component/status/Loading'
import SlideMangaCard from '@/component/Slide/slide-manga-card'
import SlideMangaCardFullWidth from '@/component/Slide/slide-manga-cardwidth'
import MangaTabs from '@/component/manga-tabs'
import mie from '@/assets/image/mie.jpg'

export default function Home() {
  // const thiller = '07251805-a27e-4d59-b488-f0bfbec15168'
  const oneshot = '0234a31e-a729-4e28-9d6a-3f87c4966b9e'
  // const action = '391b0423-d847-456f-aff0-8b0cfc03066b'
  const romance = '423e2eae-a7a2-4a8b-ac03-a8351462d71d'
  const comedy = '4d32cc48-9f00-4cca-9b5a-a839f0764984'
  const sol = 'e5301a23-ebd9-49dd-a0cb-2add944c7fe9'
  const SchoolLife = 'caaa44eb-cd40-4177-b930-79d3ef2afe87'

  return (
    <RecoilRoot>
      <div className='relative'>
        <div
          className='absolute inset-0 bg-no-repeat bg-fixed bg-left -z-10'
          style={{
            backgroundImage: `url(${mie.src})`,
            backgroundSize: '20vh 40vh',
            backgroundPosition: 'left bottom',
            opacity: 0.5 // Chỉ áp dụng cho ảnh nền
          }}
        />
        {/* <div className="absolute inset-0 bg-black/50 z-0" /> */}
        <div className='relative z-10 px-4 md:px-10 max-w-screen-xl mx-auto'></div>
        <div className='px-4 md:px-10 max-w-screen-xl mx-auto'>
          {/* <Navbar /> */}

          <Suspense fallback={<Loading />}>
            <div className='pt-25'>
              <SlideMangaCardFullWidth id={''} />
            </div>
            <div className='md:pt-10'>
              <MangaTabs />
            </div>

            <div className='md:block hidden py-2'>
              <div className='flex flex-col'>
                <div className='pt-5 flex flex-col items-center justify-center p-4'>
                  <h2 className='text-2xl font-semibold text-gray-100 '>Rom-com</h2>
                </div>

                <div className='w-full flex justify-center'>
                  <div className='max-w-screen-xl w-full'>
                    <SlideMangaCard id={[romance, comedy, sol, SchoolLife]} />
                  </div>
                </div>
              </div>
              {/* <div className='pt-5 flex flex-col items-center justify-center p-4'>
          <h2 className='text-2xl font-semibold text-gray-100'>Hành động</h2>
        </div>
        <div className='  py-15 items-center px-9'>
          <SlideMangaCard id={[action]} />
        </div> */}
              <div className='flex flex-col'>
                <div className='pt-5 flex flex-col items-center justify-center p-4'>
                  <h2 className='text-2xl font-semibold text-gray-100 '>Oneshot</h2>
                </div>

                <div className='w-full flex justify-center'>
                  <div className='max-w-screen-xl w-full'>
                    <SlideMangaCard id={[oneshot]} />
                  </div>
                </div>
              </div>
            </div>
          </Suspense>
        </div>
      </div>
    </RecoilRoot>
  )
}
