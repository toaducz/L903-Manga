'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Navbar() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Cuộn xuống và vượt quá 100px -> ẩn navbar
        setIsVisible(false)
      } else {
        // Cuộn lên hoặc ở đầu trang -> hiện navbar
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search.trim())}`)
      setSearch('')
    }
  }

  const handleMangaFilterSearch = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(`/filter-search/`)
    if (isMenuOpen) setIsMenuOpen(false)
  }

  const handleRandomClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(`/random?t=${Date.now()}`)
    if (isMenuOpen) setIsMenuOpen(false)
  }

  const handleHistorySearch = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(`/reading-history/`)
    if (isMenuOpen) setIsMenuOpen(false)
  }

  const handleRecommendation = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push(`/recommendation`)
    if (isMenuOpen) setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav
      className={`bg-slate-900 text-white shadow-md w-screen fixed top-0 z-50 transition-transform duration-300  ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between'>
        {/* Logo */}
        <Link
          href='/homepage'
          className='text-2xl font-bold text-white hover:text-slate-300 transition-colors duration-200 hover:scale-105'
        >
          L903 Manga
        </Link>

        {/* Navigation Items - Desktop */}
        <div className='hidden lg:flex items-center gap-8 text-base font-medium'>
          {/* <Link
            href='/trending'
            className='relative text-white hover:text-slate-300 transition-colors duration-200 group'
          >
            Trending
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-slate-300 transition-all duration-300 group-hover:w-full'></span>
          </Link> */}
          <Link
            href='/recommendation'
            onClick={handleRecommendation}
            className='relative text-white hover:text-slate-300 transition-colors duration-200 group'
          >
            Romcom gợi ý bởi L903-Manga
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-slate-300 transition-all duration-300 group-hover:w-full'></span>
          </Link>
          <Link
            href='/reading-history'
            onClick={handleHistorySearch}
            className='relative text-white hover:text-slate-300 transition-colors duration-200 group'
          >
            Lịch sử đọc truyện
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-slate-300 transition-all duration-300 group-hover:w-full'></span>
          </Link>
          <Link
            href='/filter-search'
            onClick={handleMangaFilterSearch}
            className='relative text-white hover:text-slate-300 transition-colors duration-200 group'
          >
            Tìm kiếm nâng cao
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-slate-300 transition-all duration-300 group-hover:w-full'></span>
          </Link>
          <a
            href='/random'
            onClick={handleRandomClick}
            className='relative text-white hover:text-slate-300 transition-colors duration-200 group cursor-pointer'
          >
            Manga Ngẫu nhiên
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-slate-300 transition-all duration-300 group-hover:w-full'></span>
          </a>
        </div>

        {/* Search - Desktop & Tablet */}
        <form onSubmit={handleSearch} className='hidden sm:flex items-center space-x-2'>
          <input
            type='text'
            placeholder='Tìm theo tên truyện'
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

        {/* Hamburger Menu - Mobile & Tablet */}
        <button
          className='lg:hidden text-white text-2xl focus:outline-none'
          onClick={toggleMenu}
          aria-label='Toggle menu'
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile & Tablet Menu */}
      {isMenuOpen && (
        <div className='lg:hidden bg-slate-900 px-4 py-4 flex flex-col gap-4 text-base font-medium border-t border-slate-800 transition-all duration-300 ease-in-out'>
          {/* Search - Mobile */}
          <form onSubmit={handleSearch} className='flex items-center space-x-2'>
            <input
              type='text'
              placeholder='Tìm theo tên truyện'
              className='flex-1 px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 placeholder-slate-400 text-sm transition-all duration-200'
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

          {/* Navigation Items - Mobile */}
          {/* <Link
            href='/trending'
            className='text-white hover:text-slate-300 transition-colors duration-200'
            onClick={toggleMenu}
          >
            Trending
          </Link> */}
          <Link
            href='/recommendation'
            className='text-white hover:text-slate-300 transition-colors duration-200'
            onClick={toggleMenu}
          >
            Romcom gợi ý bởi L903-Manga
          </Link>
          <Link
            href='/reading-history'
            onClick={handleHistorySearch}
            className='relative text-white hover:text-slate-300 transition-colors duration-200 group'
          >
            Lịch sử đọc truyện
            <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-slate-300 transition-all duration-300 group-hover:w-full'></span>
          </Link>
          <Link
            href='/filter-search'
            className='text-white hover:text-slate-300 transition-colors duration-200'
            onClick={toggleMenu}
          >
            Tìm kiếm nâng cao
          </Link>
          <a
            href='/random'
            className='text-white hover:text-slate-300 transition-colors duration-200'
            onClick={e => {
              handleRandomClick(e)
              toggleMenu()
            }}
          >
            Manga Ngẫu nhiên
          </a>
        </div>
      )}
    </nav>
  )
}
