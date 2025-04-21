'use client'
import Kobo from '@/assets/gif/kobo.gif'
import { Box } from 'zmp-ui'
import Image from 'next/image'

export default function Loading() {
  return (
    <Box flex className='flex items-center justify-center min-h-screen'>
      <Box>
        <Image src={Kobo} alt='Loading...' width={300} height={300} className='object-contain' priority />
      </Box>
    </Box>
  )
}
