'use client'

import { useEffect, useState } from 'react'
import AuthorDetailPage from '@/page/author-detail-page'
import { Author } from '@/api/paginate'

export default function AuthorDetailPageWrapper() {
  const [isVisible, setIsVisible] = useState(false)
  const [author, setAuthor] = useState<Author | null>(null)

  useEffect(() => {
    const storedAuthor = localStorage.getItem('authorDetail')
    if (storedAuthor) {
      setAuthor(JSON.parse(storedAuthor))
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 10)
    return () => clearTimeout(timer)
  }, [])

  if (!author) {
    return <p className='text-center text-red-500 mt-8'>Không tìm thấy tác giả</p>
  }

  return (
    <div
      className={`transition-all duration-500 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-2'}`}
    >
      <AuthorDetailPage author={author} />
    </div>
  )
}
