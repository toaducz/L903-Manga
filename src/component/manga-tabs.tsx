'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MangaByTagPage from '@/page/manga-by-tag-page'

const demographics = [
  { key: 'shounen', label: 'Shounen' },
  { key: 'seinen', label: 'Seinen' },
  { key: 'shoujo', label: 'Shoujo' }
]

export default function MangaTabs() {
  const [activeTab, setActiveTab] = useState('shounen')

  return (
    <div className='w-full'>
      {/* Tabs header */}
      <div className='flex justify-center items-center gap-4 pt-5'>
        {demographics.map(demo => (
          <button
            key={demo.key}
            onClick={() => setActiveTab(demo.key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
              activeTab === demo.key
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md border border-gray-300'
            }`}
          >
            {demo.label}
          </button>
        ))}
      </div>

      {/* Tabs content with Framer Motion */}
      <div className='mt-6 flex justify-center items-center'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab} // Key để trigger animation khi activeTab thay đổi
            initial={{ opacity: 0, y: 20 }} // Trạng thái ban đầu
            animate={{ opacity: 1, y: 0 }} // Trạng thái khi xuất hiện
            exit={{ opacity: 0, y: -20 }} // Trạng thái khi biến mất
            transition={{ duration: 0.3, ease: 'easeInOut' }} // Thời gian và easing
          >
            <MangaByTagPage publicationDemographic={activeTab} pagination={false} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
