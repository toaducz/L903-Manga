// components/MangaCard.tsx
import Image from 'next/image'
import React, { useState } from 'react'
import { Manga } from '@/api/paginate'
import { useRouter } from 'next/navigation'

interface MangaCardProps {
  manga: Manga
}

const MangaItems: React.FC<MangaCardProps> = ({ manga }) => {
  // console.log(manga)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const altTitle =
            manga.attributes.altTitles.find(t => t.vi)?.vi ||
            manga.attributes.altTitles.find(t => t.en)?.en ||
            manga.attributes.altTitles.find(t => t.ja)?.ja
  const title = manga.attributes.altTitles.find(t => t.vi)?.vi ?? manga.attributes.title.en  ?? altTitle
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
        <div className='relative w-[300px] h-[450px]'>
          <Image
            src={proxyImageUrl}
            alt={title || 'title'}
            fill
            sizes='(max-width: 768px) 100vw, 300px'
            className={`object-cover rounded transition-transform duration-300 group-hover:scale-105 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            placeholder='blur'
            blurDataURL='data:image/png;base64,...'
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </div>
      </div>
      <div className='absolute -bottom-3 left-0 right-0 bg-gradient-to-t from-slate-900/70 to-transparent p-4 text-shadow-stroke'>
        <h3
          className='text-base font-semibold text-white line-clamp-2'
          title={title}
          style={{
            textShadow: '1px 2px 8px black, -1px -2px 8px black'
          }}
        >
          {title}
        </h3>
      </div>
    </div>
  )
}

export default MangaItems
