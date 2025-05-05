'use client'

import { Suspense } from 'react'
import RecommendationContentPage from '@/page/recommendation-page'
import Loading from '@/component/status/Loading'

// Bọc phần tử cần sử dụng useSearchParams() bằng Suspense
export default function SearchPage() {
  return (
    <Suspense fallback={<Loading />}>
      <RecommendationContent />
    </Suspense>
  )
}

function RecommendationContent() {
  return <RecommendationContentPage />
}
