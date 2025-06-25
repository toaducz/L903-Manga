import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/css/globals.css'
import QueryProvider from '@/app/provider'
import Navbar from '@/component/navbar'
import ScrollToTop from '@/component/scroll/scroll-to-top'
import Footer from '@/component/footer'

import NProgressInit from '@/component/NProgressInit'
import { Suspense } from 'react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'L903 Manga',
  description: 'Web đọc truyện dùng api Mangadex'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          <Suspense>
            {' '}
            <NProgressInit />
          </Suspense>
          <Navbar />
          <main className='min-h-screen bg-slate-900'>{children}</main>
          <ScrollToTop />
          <Footer />
        </QueryProvider>
      </body>
    </html>
  )
}
