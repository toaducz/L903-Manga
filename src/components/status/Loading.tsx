'use client'
import Kobo from '@/assets/gif/kobo.gif'
import Image from 'next/image'

export default function Loading() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-transparent'>
      <div>
        <Image unoptimized src={Kobo} alt='Loading...' width={300} height={300} className='object-contain' priority />
      </div>
    </div>
  )
}
