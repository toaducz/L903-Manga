'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// Tùy chỉnh NProgress
NProgress.configure({
  showSpinner: false, // Tắt biểu tượng quay tròn
  minimum: 0.3, // Hiển thị thanh progress ngay lập tức với ít nhất 30%
  easing: 'ease',
  speed: 500, // Tốc độ hoàn thành thanh (ms)
  trickleSpeed: 200 // Tốc độ tăng dần (ms)
})

export default function RouteChangeIndicator() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Khởi tạo các style cho NProgress một lần
    const style = document.createElement('style')
    style.textContent = `
      #nprogress .bar {
        background: #0070f3 !important; /* Màu xanh của Next.js */
        height: 3px !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  useEffect(() => {
    // Khi pathname hoặc searchParams thay đổi, đó là lúc đang chuyển trang
    NProgress.start()

    // Đảm bảo thanh progress hoàn thành sau một khoảng thời gian ngắn
    const timer = setTimeout(() => {
      NProgress.done()
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [pathname, searchParams])

  return null
}
