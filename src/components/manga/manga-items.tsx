import Image from 'next/image'
import React, { useState } from 'react'
import { Manga } from '@/codebase/api/paginate'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { MangaStatus, ContentRating } from '@/codebase/constants/enums'

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

  const status = MangaStatus[manga.attributes.status as keyof typeof MangaStatus] || manga.attributes.status
  const rating =
    ContentRating[manga.attributes.contentRating as keyof typeof ContentRating] || manga.attributes.contentRating

  return (
    <motion.div
      whileHover={{ y: isResponsive ? 0 : -8, scale: isResponsive ? 1.02 : 1 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`relative glass-card rounded-2xl shadow-xl transition-all duration-500 cursor-pointer group overflow-hidden border-white/5 w-full hover:neon-glow hover:border-primary/30 ${
        isResponsive ? 'flex flex-row sm:flex-col sm:aspect-[2/3]' : 'flex flex-col aspect-[2/3]'
      }`}
    >
      {/* Art Container */}
      <div
        className={`relative bg-slate-900 overflow-hidden shrink-0 ${
          isResponsive
            ? 'w-24 h-auto aspect-[2/3] sm:w-full sm:h-full sm:absolute sm:inset-0'
            : 'absolute inset-0 w-full h-full'
        }`}
      >
        <Image
          unoptimized
          src={proxyImageUrl}
          alt={`Ảnh bìa truyện ${title}`}
          fill
          sizes='(max-width: 768px) 100vw, 300px'
          className={`object-cover group-hover:scale-110 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
        />
        {isLoading && <div className='absolute inset-0 bg-slate-800 animate-pulse' />}

        {/* Rating Badge - Only on poster mode for better space */}
        <div className={`absolute top-2 right-2 z-10 ${isResponsive ? 'hidden sm:block' : 'block'}`}>
          <span className='px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[7px] font-black text-white uppercase tracking-widest border border-white/10'>
            {rating}
          </span>
        </div>
      </div>

      {/* Content Area - Mobile Horizontal */}
      {isResponsive && (
        <div className='flex sm:hidden flex-1 flex-col justify-center p-4 min-w-0'>
          <h3
            className='font-display text-xs font-black text-white line-clamp-2 leading-tight mb-2 uppercase tracking-tight'
            title={title}
          >
            {title}
          </h3>
          <div className='flex items-center gap-2'>
            <span className='text-[7px] font-black uppercase tracking-widest text-primary bg-primary/10 px-1.5 py-0.5 rounded border border-primary/20'>
              {status}
            </span>
            <span className='text-[7px] font-black text-gray-400 uppercase tracking-widest'>{rating}</span>
          </div>
        </div>
      )}

      {/* Content Area - Desktop/Poster Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex-col justify-end p-4 ${
          isResponsive ? 'hidden sm:flex' : 'flex'
        }`}
      >
        <div className='space-y-1.5 z-10'>
          <h3
            className='font-display text-xs sm:text-sm font-black text-white line-clamp-2 leading-tight tracking-tight drop-shadow-xl uppercase'
            title={title}
          >
            {title}
          </h3>

          <div className='flex items-center gap-1.5'>
            <span className='text-[7px] font-black uppercase tracking-widest text-primary bg-primary/20 px-1.5 py-0.5 rounded border border-primary/30'>
              {status}
            </span>
            {manga.attributes.year && (
              <span className='text-[7px] font-black text-gray-400 uppercase tracking-widest'>
                {manga.attributes.year}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Subtle border overlay */}
      <div className='absolute inset-0 border border-white/5 rounded-2xl pointer-events-none group-hover:border-primary/30 transition-colors z-20' />
    </motion.div>
  )
}

export default MangaItems
