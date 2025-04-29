'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { GetMangaByFilterSearch } from '@/api/Manga/getMangaByFilterSearch'
import TagMultiSelect from '@/component/tag-multi-select'
// import { Manga } from '@/api/paginate';
import MangaItems from '@/component/manga/manga-items'
import Pagination from '@/component/pagination'
import Loading from '@/component/status/Loading'
import Error from '@/component/status/error'

export default function AdvancedSearchPage() {
  const [search, setSearch] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [year, setYear] = useState<string>('desc')
  const [followedCount, setFollowedCount] = useState<string>('desc')
  const [latestUploadedChapter, setLatestUploadedChapter] = useState<string>('desc')
  const [publicationDemographic, setPublicationDemographic] = useState<string>('none')
  const [contentRating, setContentRating] = useState<string[]>(['safe', 'suggestive', 'erotica'])
  const [offset, setOffset] = useState(0)
  const limit = 20

  const {
    data: result,
    isFetching,
    isError,
    isSuccess
  } = useQuery(
    GetMangaByFilterSearch({
      id: selectedTags,
      title: search.trim(),
      offset,
      limit,
      publicationDemographic,
      followedCount,
      latestUploadedChapter,
      year,
      contentRating
    })
  )

  useEffect(() => {
    setOffset(0)
  }, [search, selectedTags, year, followedCount, latestUploadedChapter, publicationDemographic])

  // if (isFetching) {
  //     return <Loading />
  // }

  // if (isError) {
  //     return <Error />
  // }

  // if (result?.data.length === 0) {
  //     return <Error message='Không có kết quả!' />
  // }

  if (isSuccess) {
    // console.log(result)
  }

  // Xử lý tìm kiếm
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setOffset(0) // Reset offset khi tìm kiếm mới
  }

  return (
    <div className='min-h-screen bg-slate-900 pb-8 pt-25'>
      <div className='max-w-4xl mx-auto p-6 bg-slate-900 rounded-xl shadow-lg space-y-6'>
        <h2 className='text-2xl font-bold text-white text-center'>Tìm kiếm nâng cao</h2>

        {/* Form nhập tên truyện */}
        <form onSubmit={handleSearch} className='flex items-center space-x-2'>
          <input
            type='text'
            placeholder='Tìm theo tên truyện'
            className='flex-1 px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 placeholder-slate-400 text-sm transition-all duration-200'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {/* <button
                        type='submit'
                        className='px-4 py-2 bg-slate-800 text-white rounded-lg shadow-md hover:bg-slate-900 hover:scale-105 disabled:bg-slate-600 disabled:text-slate-400 disabled:shadow-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-600'
                        disabled={!search.trim()}
                    >
                        Tìm
                    </button> */}
        </form>

        {/* TagMultiSelect */}
        <TagMultiSelect setTag={setSelectedTags} selectedTags={selectedTags} />

        {/* Các select dropdown */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {/* Publication Demographic */}
          <div>
            <label className='block text-sm font-medium text-white mb-1'>Demographic</label>
            <select
              value={publicationDemographic}
              onChange={e => setPublicationDemographic(e.target.value)}
              className='w-full px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 text-sm transition-all duration-200'
            >
              <option value='none'>Không chọn</option>
              <option value='shounen'>Shounen</option>
              <option value='shoujo'>Shoujo</option>
              <option value='seinen'>Seinen</option>
              <option value='josei'>Josei</option>
            </select>
          </div>

          {/* Year */}
          <div>
            <label className='block text-sm font-medium text-white mb-1'>Năm xuất bản</label>
            <select
              value={year}
              onChange={e => setYear(e.target.value)}
              className='w-full px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 text-sm transition-all duration-200'
            >
              <option value='desc'>Mới nhất</option>
              <option value='asc'>Cũ nhất</option>
            </select>
          </div>

          {/* Followed Count */}
          <div>
            <label className='block text-sm font-medium text-white mb-1'>Lượt theo dõi</label>
            <select
              value={followedCount}
              onChange={e => setFollowedCount(e.target.value)}
              className='w-full px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 text-sm transition-all duration-200'
            >
              <option value='desc'>Cao nhất</option>
              <option value='asc'>Thấp nhất</option>
            </select>
          </div>

          {/* Chap mới */}
          <div>
            <label className='block text-sm font-medium text-white mb-1'>Cập nhật chương mới:</label>
            <select
              value={latestUploadedChapter}
              onChange={e => setLatestUploadedChapter(e.target.value)}
              className='w-full px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 text-sm transition-all duration-200'
            >
              <option value='desc'>Mới nhất</option>
              <option value='asc'>Cũ nhất</option>
            </select>
          </div>

          {/* content rating */}
          <div>
            <label className='block text-sm font-medium text-white mb-1'>Quỷ</label>
            <select
              value={contentRating.join(',')} // biến array thành string
              onChange={e => setContentRating(e.target.value.split(','))} // tách string lại thành array
              className='w-full px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 text-sm transition-all duration-200'
            >
              <option value='safe,suggestive,erotica'>Bình thường</option>
              <option value='safe,suggestive,erotica,pornographic'>Bao gồm Quỷ</option>
              <option value='pornographic'>Thuần Quỷ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Kết quả tìm kiếm */}
      <div className='max-w-7xl mx-auto mt-8'>
        {isFetching && <Loading />}
        {isError && <Error />}
        {result?.data?.length === 0 && <Error message='Không có kết quả!' />}
        {!result?.data && <Error message='Lỗi rồi' />}
        {result?.data && (
          <div className='min-h-screen flex flex-col items-center justify-center px-4'>
            <div className='flex justify-center items-center gap-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 sm:gap-5 gap-3 p-3 w-full [grid-template-columns:repeat(auto-fill,minmax(120px,1fr))] sm:[grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]'>
                {result.data.slice(0, result.data.length).map((manga, index) => (
                  <div key={index} className='min-h-[140px] sm:max-h-[450px] w-full relative overflow-visible sm:flex'>
                    <MangaItems manga={manga} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <Pagination
          total={result?.total || 0}
          offset={offset}
          limit={limit}
          onPageChange={newOffset => setOffset(newOffset)}
        />
      </div>
    </div>
  )
}
