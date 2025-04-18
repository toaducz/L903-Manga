// components/MangaCard.tsx
import Image from 'next/image'
import React, { useState } from 'react'
import { Manga } from '@/api/paginate'
import { useRouter } from 'next/navigation'

interface MangaCardProps {
  manga: Manga
}

const MangaItems: React.FC<MangaCardProps> = ({ manga }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const title = manga.attributes.title.en
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

  return (
    <div
      className='relative rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group bg-slate-800'
      onClick={handleClick}
    >
      <div className='relative w-full h-120'>
        {isLoading && <div className='absolute inset-0 bg-slate-700 animate-pulse rounded-2xl' />}
        <Image
          width={300}
          height={700}
          src={proxyImageUrl}
          alt={title || 'title'}
          className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPJ7eB1wAAAABJRU5ErkJggg=='
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </div>
      <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/70 to-transparent p-4'>
        <h3 className='text-base font-semibold text-white line-clamp-2' title={title}>
          {title}
        </h3>
      </div>
    </div>
  )
}

export default MangaItems
