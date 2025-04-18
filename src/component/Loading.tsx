'use client'
import Kobo from '@/assets/gif/kobo.gif'
import { Box } from 'zmp-ui'
import Image from 'next/image'

export default function Loading() {
  return (
    <Box flex className='flex items-center justify-center min-h-screen bg-black'>
      <Box>
        <Image src={Kobo} alt='Loading...' width={150} height={150} className='object-contain' priority />
      </Box>
    </Box>
  )
}
