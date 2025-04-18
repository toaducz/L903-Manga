'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [inputId, setInputId] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputId.trim()) {
      router.push(`/manga-detail/${inputId.trim()}`)
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4'>
      {/* Title */}
      <h1 className='text-4xl font-bold text-center mb-8'>L903 MANGA</h1>

      {/* Input form */}
      <main className='w-full max-w-md'>
        <form onSubmit={handleSubmit} className='flex gap-4 w-full'>
          <input
            type='text'
            value={inputId}
            onChange={e => setInputId(e.target.value)}
            placeholder='Nhập Manga ID...'
            className='flex-1 px-4 py-2 border border-gray-300 rounded-lg'
          />
          <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'>
            Xem
          </button>
        </form>
      </main>
      <span>Dr stone: cfc3d743-bd89-48e2-991f-63e680cc4edf</span>
      <span>One Piece: a1c7c817-4e59-43b7-9365-09675a149a6f</span>
    </div>
  )
}
