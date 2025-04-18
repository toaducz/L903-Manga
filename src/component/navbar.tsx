'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Navbar() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`)
      setSearch('')
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className='bg-slate-900 text-white shadow-md w-screen fixed top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex items-center justify-between'>
        {/* Logo */}
        <Link
          href='/'
          className='text-2xl font-bold text-white hover:text-slate-300 transition-colors duration-200 hover:scale-105'
        >
          L903 Manga
        </Link>

        {/* Navigation Items - Desktop */}
        <div className='hidden md:flex gap-8 text-base font-medium'>
          <Link
            href='/trending'
            className='relative text-white hover:text-slate-300 transition-colors duration-200 group'
          >
            Trending
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-slate-300 transition-all duration-300 group-hover:w-full'></span>
          </Link>
          <Link
            href='/popular'
            className='relative text-white hover:text-slate-300 transition-colors duration-200 group'
          >
            Phổ biến
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-slate-300 transition-all duration-300 group-hover:w-full'></span>
          </Link>
          {/* <Link
            href="/authors"
            className="relative text-white hover:text-slate-300 transition-colors duration-200 group"
          >
            Authors
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-300 transition-all duration-300 group-hover:w-full"></span>
          </Link> */}
          <Link
            href='/genres'
            className='relative text-white hover:text-slate-300 transition-colors duration-200 group'
          >
            Thể loại
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-slate-300 transition-all duration-300 group-hover:w-full'></span>
          </Link>
          <Link
            href='/random'
            className='relative text-white hover:text-slate-300 transition-colors duration-200 group'
          >
            Manga ngẫu nhiên
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-slate-300 transition-all duration-300 group-hover:w-full'></span>
          </Link>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className='flex items-center space-x-2'>
          <input
            type='text'
            placeholder='Tìm Manga...'
            className='px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 placeholder-slate-400 text-sm transition-all duration-200'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            type='submit'
            className='px-4 py-2 bg-slate-800 text-white rounded-lg shadow-md hover:bg-slate-900 hover:scale-105 disabled:bg-slate-600 disabled:text-slate-400 disabled:shadow-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-600'
            disabled={!search.trim()}
          >
            Tìm
          </button>
        </form>

        {/* Hamburger Menu - Mobile */}
        <button
          className='md:hidden text-white text-2xl focus:outline-none'
          onClick={toggleMenu}
          aria-label='Toggle menu'
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-slate-900 px-4 py-4 flex flex-col gap-4 text-base font-medium border-t border-slate-800'>
          <Link
            href='/trending'
            className='text-white hover:text-slate-300 transition-colors duration-200'
            onClick={toggleMenu}
          >
            Trending
          </Link>
          <Link
            href='/popular'
            className='text-white hover:text-slate-300 transition-colors duration-200'
            onClick={toggleMenu}
          >
            Popular
          </Link>
          <Link
            href='/authors'
            className='text-white hover:text-slate-300 transition-colors duration-200'
            onClick={toggleMenu}
          >
            Authors
          </Link>
          <Link
            href='/genres'
            className='text-white hover:text-slate-300 transition-colors duration-200'
            onClick={toggleMenu}
          >
            Genres
          </Link>
        </div>
      )}
    </nav>
  )
}
