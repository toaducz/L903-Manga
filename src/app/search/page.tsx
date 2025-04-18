// app/search/page.tsx
import { notFound } from 'next/navigation'
import SearchResultPage from '@/page/search-resultt-page'

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q?.trim()

  // Nếu không có query, trả về 404 hoặc hiển thị thông báo
  if (!query) {
    notFound() // Hoặc return <div>Vui lòng nhập từ khóa tìm kiếm</div>
  }

  return <SearchResultPage title={query} />
}
