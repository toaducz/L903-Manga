'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface HeroBannerProps {
  title: string
  description?: string
  imageUrl: string
  mangaId?: string
}

const HeroBanner: React.FC<HeroBannerProps> = ({ title, description, imageUrl }) => {
  return (
    <div className='relative w-full h-[60vh] md:h-[80vh] overflow-hidden rounded-3xl group'>
      {/* Background Image with Parallax effect via Framer Motion */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className='absolute inset-0'
      >
        <Image unoptimized src={imageUrl} alt={title} fill priority className='object-cover object-top' />
        {/* Cinematic Scrims */}
        <div className='absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent' />
        <div className='absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent' />
      </motion.div>

      {/* Content */}
      <div className='absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-20'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className='max-w-2xl'
        >
          <span className='inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded-full bg-primary text-primary-foreground neon-glow'>
            Featured Manga
          </span>
          <h1 className='mb-4 text-4xl font-black md:text-6xl lg:text-7xl font-display text-white drop-shadow-2xl'>
            {title}
          </h1>
          {description && (
            <p className='mb-8 text-sm font-medium leading-relaxed text-gray-300 md:text-base line-clamp-3 opacity-80'>
              {description}
            </p>
          )}

          <div className='flex items-center gap-4'>
            <button className='px-8 py-3 font-bold transition-all rounded-full bg-primary text-primary-foreground hover:scale-105 active:scale-95 neon-glow'>
              Read Now
            </button>
            <button className='px-8 py-3 font-bold text-white transition-all border glass-card rounded-full hover:bg-white/10 active:scale-95'>
              Add to Library
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className='absolute bottom-0 right-0 p-8 hidden md:block'>
        <div className='flex items-center gap-2 text-xs font-bold tracking-tighter text-white/40 uppercase'>
          <span className='w-8 h-[1px] bg-white/20' />
          Cuộn để khám phá
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
