'use client'

import React, { useState } from 'react'
import { Author } from '@/api/paginate'
import { format } from 'date-fns'
import user from '@/assets/image/user.png'
import Image from 'next/image'

// Hàm để rút gọn các link trong bio
function renderMarkdownToHTML(markdown: string): string {
  return markdown.replace(
    /\[([^\]]+)]\((https?:\/\/[^\)]+)\)/g,
    '<a href="$2" target="_blank" class="text-blue-600 hover:underline">$1</a>'
  )
}

type Props = {
  author: Author
}

export default function AuthorDetailPage({ author }: Props) {
  const { attributes } = author
  const biography = attributes.biography.en || 'Không có tiểu sử'
  const [expanded, setExpanded] = useState(false)

  // Nếu không mở rộng thì chỉ hiện một phần
  const shortened = biography.split(' ').slice(0, 40).join(' ') + '...'

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10'>
      {/* Ảnh user ở trên cùng */}
      <div className='flex justify-center mb-6'>
        <Image src={user} alt='User Avatar' className='w-32 h-32 rounded-full border-4 border-gray-300' />
      </div>

      <h1 className='text-3xl font-bold text-gray-800 mb-4 text-center'>{attributes.name}</h1>

      {/* Tiểu sử */}
      <div className='text-gray-600 whitespace-pre-line mb-6'>
        <p dangerouslySetInnerHTML={{ __html: renderMarkdownToHTML(expanded ? biography : shortened) }} />
        <button onClick={() => setExpanded(!expanded)} className='mt-2 text-sm text-blue-500 hover:underline'>
          {expanded ? 'Thu gọn' : 'Xem thêm'}
        </button>
      </div>

      {/* Thông tin thêm */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
        <div>
          <h2 className='text-xl font-semibold text-gray-700 mb-2'>Thông tin thêm</h2>
          <p className='text-gray-500'>
            <strong>Ngày tạo:</strong> {format(new Date(attributes.createdAt), 'dd/MM/yyyy')}
          </p>
          <p className='text-gray-500'>
            <strong>Cập nhật lần cuối:</strong> {format(new Date(attributes.updatedAt), 'dd/MM/yyyy')}
          </p>
        </div>

        {/* Liên kết */}
        <div>
          <h2 className='text-xl font-semibold text-gray-700 mb-2'>Liên kết</h2>
          <ul className='list-disc list-inside text-blue-600 space-y-1'>
            {attributes.twitter && (
              <li>
                <a href={`https://twitter.com/${attributes.twitter}`} target='_blank' rel='noopener noreferrer'>
                  Twitter
                </a>
              </li>
            )}
            {attributes.pixiv && (
              <li>
                <a href={attributes.pixiv} target='_blank' rel='noopener noreferrer'>
                  Pixiv
                </a>
              </li>
            )}
            {attributes.youtube && (
              <li>
                <a href={attributes.youtube} target='_blank' rel='noopener noreferrer'>
                  YouTube
                </a>
              </li>
            )}
            {attributes.website && (
              <li>
                <a href={attributes.website} target='_blank' rel='noopener noreferrer'>
                  Website
                </a>
              </li>
            )}
            {!attributes.twitter && !attributes.pixiv && !attributes.youtube && !attributes.website && (
              <li className='text-gray-400'>Không có liên kết nào</li>
            )}
          </ul>
        </div>
      </div>

      {/* Bạn có thể render thêm danh sách manga của author ở đây nếu muốn */}
    </div>
  )
}
