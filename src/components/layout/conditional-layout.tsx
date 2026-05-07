'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/navbar'
import ScrollToTop from '@/components/layout/scroll/scroll-to-top'
import Footer from '@/components/layout/footer'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isSelfHostPage = pathname === '/self-host'

  if (isSelfHostPage) {
    return <main className='min-h-screen bg-slate-900'>{children}</main>
  }

  return (
    <>
      <Navbar />
      <main className='min-h-screen bg-slate-900'>{children}</main>
      <ScrollToTop />
      <Footer />
    </>
  )
}
