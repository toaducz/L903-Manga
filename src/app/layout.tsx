import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.css'
import QueryProvider from '@/app/provider'
import NProgressInit from '@/components/common/NProgressInit'
import { Suspense } from 'react'
import ConditionalLayout from '@/components/layout/conditional-layout'

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
          <ConditionalLayout>{children}</ConditionalLayout>
        </QueryProvider>
      </body>
    </html>
  )
}
