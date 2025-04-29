'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Chapter } from '@/api/Manga/getChapter'
import { FaBookOpen, FaTrash } from 'react-icons/fa'

type ReadingItem = {
  mangaId: string
  chapterId: string
  chapter: Chapter[]
  title: string
  number: string
  lang: string
  updatedAt: number
}

export default function ReadingHistoryPage() {
  const [history, setHistory] = useState<ReadingItem[]>([])

  useEffect(() => {
    const getReadingHistory = (): ReadingItem[] => {
      if (typeof window === 'undefined') return []

      const current = localStorage.getItem('reading_history')
      if (!current) return []

      try {
        return JSON.parse(current)
      } catch {
        return []
      }
    }

    const data = getReadingHistory()
    setHistory(data)
  }, [])

  const handleClearHistory = () => {
    if (typeof window === 'undefined') return
    localStorage.removeItem('reading_history')
    setHistory([])
  }

  if (history.length === 0) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6'>
        <FaBookOpen className='text-6xl mb-4 opacity-70' />
        <h1 className='text-3xl font-bold mb-4 text-center'>Chưa có lịch sử đọc truyện</h1>
        <p className='text-lg text-gray-300 mb-6 text-center'>Bắt đầu đọc ngay để lưu lại những chương yêu thích!</p>
        <Link
          href='/'
          className='px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50'
        >
          Quay về trang chủ
        </Link>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6 pt-24 pb-12'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8 text-center'>Lịch sử đọc truyện</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {history.map((item, index) => (
            <Link
              href={`/reader/${item.chapterId}?mangaId=${item.mangaId}&chapterId=${item.chapterId}&chapter=${item.chapter}&number=${item.number}&lang=${item.lang}`}
              key={index}
              className='group bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105'
            >
              <div className='space-y-3'>
                <div className='h-13'>
                  <h3 className='text-xl font-semibold text-white group-hover:text-blue-300 transition-colors line-clamp-2'>
                    {item.title}
                  </h3>
                </div>
                <p className='text-gray-300'>Chapter: {item.number}</p>
                <p className='text-gray-300'>Ngôn ngữ: {item.lang.toUpperCase()}</p>
                <p className='text-sm text-gray-400'>
                  Đọc lần cuối: {new Date(item.updatedAt).toLocaleString('vi-VN')}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className='mt-12 flex justify-center'>
          <button
            onClick={handleClearHistory}
            className='flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-50'
            aria-label='Xóa lịch sử đọc truyện'
          >
            <FaTrash />
            Xóa lịch sử đọc truyện
          </button>
        </div>
      </div>
    </div>
  )
}
