// 'use client'

// import React, { } from 'react'
// import { useRouter } from 'next/router'
// import Image from 'next/image'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import 'swiper/css'
// import 'swiper/css/pagination'
// import { Pagination } from 'swiper/modules'
// import { useQuery } from '@tanstack/react-query'
// import Loading from './Loading'
// import { getChapters } from '@/api/Manga/getChapter'

// const LatestMangaSlider = () => {

//     const { data: latestManga, isLoading } = useQuery(getChapters({ offset: 0, limit: 10 }))

//     if (isLoading) {
//         return (<Loading />)
//     }
//     console.log(latestManga.data)
//     return (
//         <div></div>
//         // <div className='relative w-full'>
//         //     <Swiper slidesPerView={1} pagination={{ clickable: true }} modules={[Pagination]}>
//         //         {latestManga?.data.map(manga => {
//         //             const attributes = manga.attributes
//         //             const coverArt = manga.relationships.find(rel => rel.type === 'cover_art')
//         //             const author = manga.relationships.find(rel => rel.type === 'author')
//         //             const coverArtFileName = coverArt?.attributes?.fileName
//         //             const coverImageUrl = coverArtFileName
//         //                 ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArtFileName}`
//         //                 : ''
//         //             const proxyImageUrl = `/api/image?url=${encodeURIComponent(coverImageUrl)}`

//         //             return (
//         //                 <SwiperSlide key={manga.id}>
//         //                     <div className='relative'>
//         //                         {/* Background Layer */}
//         //                         <div className='absolute inset-0 z-0 min-h-screen'>
//         //                             <Image src={proxyImageUrl} alt='Blur Background' fill className='object-cover blur-lg opacity-70' />
//         //                             <div className='absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] opacity-70' />
//         //                         </div>

//         //                         {/* Content Layer */}
//         //                         <div className='pt-15 relative z-20'>
//         //                             <div className='max-w-6xl mx-auto p-6 md:px-12 pt-12 pb-8'>
//         //                                 <div className='flex flex-col md:flex-row items-start gap-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6'>
//         //                                     {/* Cover Image */}
//         //                                     <div className='w-full md:w-[300px] flex-shrink-0'>
//         //                                         <Image
//         //                                             src={proxyImageUrl}
//         //                                             alt='Manga Cover'
//         //                                             width={300}
//         //                                             height={450}
//         //                                             className='object-cover rounded-xl shadow-md w-full'
//         //                                         />
//         //                                     </div>

//         //                                     {/* Manga Details */}
//         //                                     <div className='flex-1 space-y-6'>
//         //                                         <div>
//         //                                             <h1 className='text-4xl font-bold text-white mb-2'>{attributes.title.en}</h1>
//         //                                             {attributes.altTitles.find(item => item.vi)?.vi ? (
//         //                                                 <p className='text-gray-400 italic text-lg'>{attributes.altTitles.find(item => item.vi)?.vi}</p>
//         //                                             ) : (
//         //                                                 <p className='text-gray-400 italic text-lg'>{attributes.altTitles.find(item => item.en)?.en}</p>
//         //                                             )}
//         //                                         </div>

//         //                                         <p className='text-gray-200'>{attributes.description?.vi || 'Không có mô tả'}</p>

//         //                                         <div className='text-sm text-gray-300'>
//         //                                             <p><strong>Tác giả:</strong> {author?.attributes?.name || 'Không rõ'}</p>
//         //                                             <p><strong>Trạng thái:</strong> {attributes.status || 'Không rõ'}</p>
//         //                                             <p><strong>Năm phát hành:</strong> {attributes.year || 'Không rõ'}</p>
//         //                                         </div>

//         //                                         <button
//         //                                             className='mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition'
//         //                                             onClick={() => {
//         //                                                 router.push(`/reader/${manga.chapterId}?mangaId=${manga.id}`)
//         //                                             }}
//         //                                         >
//         //                                             Đọc Truyện
//         //                                         </button>
//         //                                     </div>
//         //                                 </div>
//         //                             </div>
//         //                         </div>
//         //                     </div>
//         //                 </SwiperSlide>
//         //             )
//         //         })}
//         //     </Swiper>
//         // </div>
//     )
// }

// export default LatestMangaSlider
