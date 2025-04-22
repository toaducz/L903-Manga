import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className='bg-gradient-to-r from-slate-900 to-slate-800 text-white py-10'>
      <div className='max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center space-y-4'>
        {/* Credit Mangadex API */}
        <p className='text-sm md:text-base'>
          Powered by{' '}
          <a
            href='https://mangadex.org/'
            target='_blank'
            rel='noopener noreferrer'
            className='font-semibold text-blue-400 hover:text-blue-300 underline transition-colors duration-200'
          >
            Mangadex API
          </a>
        </p>

        {/* Optional: Additional Info */}
        <p className='text-xs md:text-sm text-gray-400'>
          All manga content is sourced from Mangadex. This site does not host or own any content.
        </p>

        {/* Optional: Social/Extra Links */}
        <div className='flex space-x-4'>
          <a
            href='https://mangadex.org/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-400 hover:text-white transition-colors duration-200'
          >
            <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79-4-4-4z' />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
