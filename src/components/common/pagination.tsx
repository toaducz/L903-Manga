'use client'

import React from 'react'

interface PaginationProps {
  total: number
  offset: number
  limit: number
  onPageChange: (newOffset: number) => void
}

const getPaginationPages = (current: number, totalPages: number): (number | string)[] => {
  const pages: (number | string)[] = []

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    if (current <= 2) {
      pages.push(1, 2, 3, '...', totalPages)
    } else if (current >= totalPages - 1) {
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages)
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', totalPages)
    }
  }

  return pages
}

const Pagination: React.FC<PaginationProps> = ({ total, offset, limit, onPageChange }) => {
  const totalPages = Math.ceil(total / limit)
  const currentPage = Math.floor(offset / limit) + 1
  const lastOffset = (totalPages - 1) * limit

  const pages = getPaginationPages(currentPage, totalPages)

  if (totalPages <= 1) return null

  return (
    <div className='flex items-center justify-center mt-12 gap-3 flex-wrap'>
      <button
        onClick={() => onPageChange(0)}
        disabled={currentPage === 1}
        className='px-6 py-2.5 glass-card text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer'
      >
        Đầu
      </button>
      <button
        onClick={() => onPageChange(Math.max(0, offset - limit))}
        disabled={currentPage === 1}
        className='px-6 py-2.5 glass-card text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer'
      >
        Trước
      </button>

      <div className='flex items-center gap-2 px-2 py-1.5 glass-card rounded-xl'>
        {pages.map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange((page - 1) * limit)}
              className={`min-w-[40px] h-10 rounded-lg text-xs font-black transition-all cursor-pointer ${
                page === currentPage
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className='px-2 text-gray-600 font-black tracking-widest'>
              ...
            </span>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(Math.min((totalPages - 1) * limit, offset + limit))}
        disabled={currentPage === totalPages}
        className='px-6 py-2.5 glass-card text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer'
      >
        Sau
      </button>
      <button
        onClick={() => onPageChange(lastOffset)}
        disabled={currentPage === totalPages}
        className='px-6 py-2.5 glass-card text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer'
      >
        Cuối
      </button>
    </div>
  )
}

export default Pagination
