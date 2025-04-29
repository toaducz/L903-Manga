'use client'

import { useQuery } from '@tanstack/react-query'
import { getChaptersByMangaId } from '@/api/Manga/getChapter'
import React, { useMemo, useEffect, useState } from 'react'
import Loading from '../status/Loading'
import Pagination from '../pagination'
import { useSearchParams, useRouter } from 'next/navigation'
import Error from '../status/error'
import { getLanguageName } from '@/utils/enums'
import { formatDate } from '@/utils/format'

interface MangaChaptersListProps {
  mangaId: string
  offsetParams?: number
  chapterId?: string
  langFilterValue?: string[]
  langValue?: string
  order?: string
}

const MangaChaptersList: React.FC<MangaChaptersListProps> = ({
  mangaId,
  offsetParams,
  chapterId,
  langFilterValue,
  langValue,
  order
}) => {
  const searchParams = useSearchParams()
  // useEffect(() => {
  //   console.log(langFilterValue)
  // },[])
  const router = useRouter()
  const limit = 20
  const offset = useMemo(() => {
    if (offsetParams !== undefined && offsetParams !== null) {
      return offsetParams
    }
    return parseInt(searchParams.get('offset') || '0', 10)
  }, [offsetParams, searchParams])
  const [sortOrder, setSortOrder] = useState(order ?? 'asc')
  const setOffset = (newOffset: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('offset', newOffset.toString())
    router.push(`?${params.toString()}`, { scroll: false })
  }
  const [lang, setLang] = useState<string>(langValue ?? 'all')
  const [langFilter, setLangFilter] = useState(langFilterValue ?? ['vi', 'en'])
  const [isVisible, setIsVisible] = useState(false)

  const {
    data: chapter,
    isLoading,
    isError
  } = useQuery(getChaptersByMangaId({ id: mangaId, limit: limit, offset: offset, order: sortOrder, lang: langFilter }))

  const handleLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value as 'all' | 'vi' | 'en'
    setLang(selected)

    if (selected === 'all') {
      setLangFilter(['vi', 'en'])
    } else {
      setLangFilter([selected])
    }

    setOffset(0)
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value)
  }

  // console.log(chapter?.data)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  if (chapter?.data === undefined) {
    return <Error message='Lỗi rồi' />
  }

  // if (chapter.total === 0) {
  //   return <Error message='Truyện này khả năng khó đọc' />
  // }

  return (
    <div
      className={`space-y-2 pb-8 px-8 transition-all duration-500 ease-in-out transform ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'
      }`}
    >
      <Pagination
        total={chapter?.total || 0}
        offset={offset}
        limit={limit}
        onPageChange={newOffset => setOffset(newOffset)}
      />
      <div className='flex justify-end mb-4 space-x-3'>
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className='px-4 py-2 border border-gray-400 rounded-md text-white bg-slate-800'
        >
          <option value='asc'>Tăng dần</option>
          <option value='desc'>Giảm dần</option>
        </select>
        <select
          value={lang}
          onChange={handleLangChange}
          className='px-4 py-2 border border-gray-400 rounded-md text-white bg-slate-800'
        >
          <option value='all'>Tất cả ngôn ngữ</option>
          <option value='vi'>Tiếng Việt</option>
          <option value='en'>Tiếng Anh</option>
        </select>
      </div>

      {chapter.total === 0 ? (
        <div className='w-full h-full flex items-center justify-center py-10'>
          <p className='text-gray-500 text-lg'>Không có tiếng Việt!</p>
        </div>
      ) : (
        chapter?.data.map(item => (
          <div
            key={item.id}
            className={`p-3 rounded-md hover:bg-slate-600 transition cursor-pointer
      ${item.id === chapterId ? 'bg-green-700' : 'bg-slate-800'}`}
            onClick={() =>
              router.push(
                `/reader/${item.id}?mangaId=${mangaId}&offset=${offset}&chapterId=${item.id}&number=${item.attributes.chapter}&lang=${getLanguageName(item.attributes.translatedLanguage)}&langFilter=${item.attributes.translatedLanguage}&langValue=${lang}&order=${sortOrder}&chapter=${chapter.data}`
              )
            }
          >
            <div className='flex justify-between items-center'>
              <p className='text-white'>
                <strong>Chapter {item.attributes.chapter ?? 'Oneshot'}</strong>{' '}
                {item.attributes.title && `- ${item.attributes.title}`}
              </p>
              <span className='italic text-sm text-gray-300'>{formatDate(item.attributes.updatedAt)}</span>
            </div>
            <p className='text-sm text-white'>Volume: {item.attributes.volume}</p>
            <p className='text-sm text-white'>Ngôn ngữ: {getLanguageName(item.attributes.translatedLanguage)}</p>
            <p className='text-sm text-white'>
              Nhóm dịch: {item.relationships.find(r => r.type === 'scanlation_group')?.attributes?.name ?? 'Không rõ'}
            </p>
          </div>
        ))
      )}
      <Pagination
        total={chapter?.total || 0}
        offset={offset}
        limit={limit}
        onPageChange={newOffset => setOffset(newOffset)}
      />
    </div>
  )
}

export default MangaChaptersList
