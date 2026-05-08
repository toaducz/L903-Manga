'use client'
import klee from '@/assets/gif/klee-genshin.gif'
import Image from 'next/image'

interface ErrorProps {
  message?: string
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen space-y-4 bg-transparent text-foreground'>
      <Image unoptimized src={klee} alt='Error...' width={300} height={300} className='object-contain' priority />
      <span className='text-lg font-bold uppercase tracking-widest text-primary neon-glow'>
        Có lỗi rồi người anh em!!!
      </span>
      {message && <span className='text-2xl font-black text-center text-white'>{message}</span>}
    </div>
  )
}

export default Error
