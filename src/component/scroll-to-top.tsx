'use client'

import { useState, useEffect } from 'react'

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`w-13 fixed bottom-6 right-6 z-50 p-3 bg-slate-800 hover:bg-slate-600 text-white rounded-full shadow-lg transition-opacity transition-transform duration-500 ease-in-out ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'
      }`}
    >
      ↑
    </button>
  )
}

export default ScrollToTopButton
