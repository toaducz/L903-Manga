'use client'
import klee from '@/assets/gif/klee-genshin.gif'
import Image from 'next/image'

interface ErrorProps {
  message?: string
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen space-y-4 bh-black'>
      <Image unoptimized src={klee} alt='Error...' width={300} height={300} className='object-contain' priority />
      <span className='text-lg font-semibold'>Có lỗi rồi người anh em!!!</span>
      {message && <span className='text-2xl font-bold text-center'>{message}</span>}
    </div>
  )
}

export default Error
