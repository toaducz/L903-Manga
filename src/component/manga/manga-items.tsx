import Image from 'next/image'
import React, { useState } from 'react'
import { Manga } from '@/api/paginate'
import { useRouter } from 'next/navigation'

interface MangaCardProps {
  manga: Manga
  isResponsive?: boolean
}

const MangaItems: React.FC<MangaCardProps> = ({ manga, isResponsive = true }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const altTitle = manga.attributes.altTitles.find(t => t.en)?.en || manga.attributes.altTitles.find(t => t.ja)?.ja
  const title = manga.attributes.altTitles.find(t => t.vi)?.vi ?? manga.attributes.title.en ?? altTitle

  const coverArt = manga.relationships.find(rel => rel.type === 'cover_art')
  const coverArtFileName = coverArt?.attributes?.fileName
  const coverImageUrl = coverArtFileName ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArtFileName}` : ''
  const proxyImageUrl = `/api/image?url=${encodeURIComponent(coverImageUrl)}`

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault()
    if (manga.id.trim()) {
      router.push(`/manga-detail/${manga.id.trim()}`)
    }
  }

  // console.log(manga)

  return (
    <div
      className={`bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group overflow-hidden ${isResponsive ? 'flex sm:block' : ''}`}
      onClick={handleClick}
    >
      {/* Ảnh */}
      <div
        className={`relative ${isResponsive ? 'w-[80px] h-[120px] sm:w-[300px] sm:h-[450px]' : 'w-[300px] h-[450px]'} flex-shrink-0`}
      >
        {isLoading && <div className='absolute inset-0 bg-slate-700 animate-pulse rounded-2xl' />}
        <Image
          src={proxyImageUrl}
          alt={title || 'title'}
          fill
          sizes='(max-width: 768px) 100vw, 300px'
          className={`object-cover object-center transition-transform duration-300 group-hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'} rounded-2xl`}
          placeholder='blur'
          blurDataURL='data:image/png;base64,...'
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </div>
      {/* Tiêu đề */}
      <div className='h-20 p-3 sm:absolute -bottom-3 left-0 right-0 sm:bg-gradient-to-t from-black/100 to-transparent p-4 text-shadow-stroke'>
        <h3
          className='text-base font-semibold text-white line-clamp-2'
          title={title}
          style={{
            textShadow: '1px 2px 8px black, -1px -2px 8px black'
          }}
        >
          {title}
        </h3>

        {/* Hiện altTitle chỉ khi trên mobile */}
        {isResponsive && (
          <p className='text-sm text-gray-300 mt-1 sm:hidden line-clamp-2 overflow-hidden text-ellipsis'>{altTitle}</p>
        )}
      </div>
    </div>
  )
}

export default MangaItems
