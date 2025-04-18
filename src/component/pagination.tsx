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

  return (
    <div className='flex items-center justify-center mt-6 gap-2 flex-wrap'>
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className='px-4 py-2 bg-slate-800 text-white rounded-lg shadow-md hover:bg-slate-900 disabled:bg-slate-600 disabled:text-slate-400 disabled:shadow-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-600'
      >
        Về đầu
      </button>
      <button
        onClick={() => onPageChange(Math.max(0, offset - limit))}
        disabled={currentPage === 1}
        className='px-4 py-2 bg-slate-800 text-white rounded-lg shadow-md hover:bg-slate-900 disabled:bg-slate-600 disabled:text-slate-400 disabled:shadow-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-600'
      >
        Lùi
      </button>

      {pages.map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange((page - 1) * limit)}
            className={`px-4 py-2 rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-600 ${
              page === currentPage
                ? 'bg-slate-900 text-white font-semibold shadow-md'
                : 'bg-slate-700 text-white hover:bg-slate-800'
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className='px-4 py-2 text-slate-500 select-none'>
            ...
          </span>
        )
      )}

      <button
        onClick={() => onPageChange(Math.min((totalPages - 1) * limit, offset + limit))}
        disabled={currentPage === totalPages}
        className='px-4 py-2 bg-slate-800 text-white rounded-lg shadow-md hover:bg-slate-900 disabled:bg-slate-600 disabled:text-slate-400 disabled:shadow-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-600'
      >
        Tiến
      </button>
      <button
        onClick={() => onPageChange(lastOffset)}
        disabled={currentPage === totalPages}
        className='px-4 py-2 bg-slate-800 text-white rounded-lg shadow-md hover:bg-slate-900 disabled:bg-slate-600 disabled:text-slate-400 disabled:shadow-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-600'
      >
        Về cuối
      </button>
    </div>
  )
}

export default Pagination
