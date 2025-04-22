// app/search/page.tsx
import { notFound } from 'next/navigation'
import SearchResultPage from '@/page/search-resultt-page'

export default function SearchPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  const query = searchParams?.q?.toString().trim()

  if (!query) {
    notFound()
  }

  return <SearchResultPage title={query} />
}
