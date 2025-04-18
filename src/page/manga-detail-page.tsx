import React, { useState } from 'react'
import { Manga } from '@/api/paginate'
import Image from 'next/image'
import { translateText } from '@/utils/translate' // Import hàm dịch
import { MangaStatus, OriginalLanguage } from '@/utils/enums' // Import các enum
import { getAuthorById } from '@/api/Author/getAuthorById'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface MangaDetailPageProps {
  manga: Manga
}

const MangaDetailPage: React.FC<MangaDetailPageProps> = ({ manga }) => {
  const router = useRouter()
  const [isTranslate, setIsTranslate] = useState(false) // Quản lý trạng thái dịch
  const [translatedDescription, setTranslatedDescription] = useState<string>('') // Văn bản đã dịch
  const attributes = manga.attributes
  const isVietnameseAvailable = attributes.availableTranslatedLanguages.includes('vi')
  const coverArt = manga.relationships.find(rel => rel.type === 'cover_art')
  const coverArtFileName = coverArt?.attributes?.fileName
  const coverImageUrl = coverArtFileName ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArtFileName}` : ''
  const proxyImageUrl = `/api/image?url=${encodeURIComponent(coverImageUrl)}`

  const authorId = manga.relationships.find(item => item.type === 'author')?.id
  const { data: author } = useQuery(getAuthorById({ id: authorId! }))

  function removeNoteSection(text: string): string {
    const noteIndex = text.toLowerCase().indexOf('note:')
    if (noteIndex !== -1) {
      return text.slice(0, noteIndex).trim()
    }
    return text
  }

  // const des = removeNoteSection(attributes.description.en)

  const handleTranslate = async (text: string) => {
    if (!isTranslate && !translatedDescription) {
      try {
        const translated = await translateText(text)
        setTranslatedDescription(translated)
        setIsTranslate(true)
      } catch (error) {
        console.error('Translation failed:', error)
      }
    } else {
      // Nếu đã dịch thì chỉ cần toggle hiển thị
      setIsTranslate(!isTranslate)
    }
  }

  return (
    <div className='max-w-6xl mx-auto p-6 md:p-12'>
      <div className='flex flex-col md:flex-row items-start gap-10'>
        {/* Cover Image */}
        <div className='w-full md:w-[300px] flex-shrink-0'>
          <Image
            src={proxyImageUrl}
            alt='Manga Cover'
            width={300}
            height={450}
            className='object-cover rounded-xl shadow-md w-full'
          />
        </div>

        {/* Manga Details */}
        <div className='flex-1 space-y-6'>
          <div>
            <h1 className='text-4xl font-bold mb-2'>{attributes.title.en}</h1>
            {attributes.altTitles.find(item => item.vi)?.vi ? (
              <p className='text-gray-500 italic text-lg'>{attributes.altTitles.find(item => item.vi)?.vi}</p>
            ) : (
              <p className='text-gray-500 italic text-lg'>{attributes.altTitles.find(item => item.jp)?.jp}</p>
            )}
          </div>

          <div className='space-y-2 text-gray-100 text-base leading-relaxed'>
            {/* Mô tả Manga */}
            <p>
              {isTranslate
                ? translatedDescription
                : attributes.description.vi || removeNoteSection(attributes.description.en) || 'Không có mô tả'}
            </p>

            <div className='flex items-center gap-2 py-2'>
              <span
                onClick={() => handleTranslate(removeNoteSection(attributes.description.en))}
                className='text-sm cursor-pointer underline font-bold hover:underline font-boldcursor-pointer hover:underline hover:font-bold hover:text-gray-600'
              >
                {isTranslate ? 'Hiện nội dung gốc' : 'Dịch nội dung sang tiếng Việt'}
              </span>
            </div>

            {!isVietnameseAvailable ? (
              <p className='text-red-600 font-medium'>Truyện hiện tại chưa có Tiếng Việt</p>
            ) : (
              <p className='text-green-600 font-medium'>Truyện đã có bản dịch Tiếng Việt</p>
            )}
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-200 mt-4'>
            <div>
              <span className='font-bold'>Tình trạng: </span>
              <span className=''>{MangaStatus[attributes.status as keyof typeof MangaStatus] || 'Không rõ'}</span>
              <span></span>
            </div>
            <div>
              <span className='font-bold'>Năm phát hành: </span>
              <span>{attributes.year || 'Không rõ'}</span>
            </div>
            <div>
              <span className='font-bold'>Tác giả: </span>
              <span
                className='text-sm cursor-pointer hover:underline font-boldcursor-pointer hover:underline hover:font-bold hover:text-gray-600'
                onClick={() => {
                  localStorage.setItem('authorDetail', JSON.stringify(author?.data))
                  router.push('/author-detail')
                }}
              >
                {author?.data.attributes.name || 'Chưa rõ'}
              </span>
            </div>
            <div>
              <span className='font-bold'>Ngôn ngữ gốc: </span>
              <span>
                {OriginalLanguage[attributes.originalLanguage as keyof typeof OriginalLanguage] || 'Không rõ'}
              </span>
            </div>
          </div>

          <div className='pt-6 flex flex-wrap gap-4'>
            <button className='px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition'>
              Đọc Truyện
            </button>
            <button className='px-5 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition'>
              Thêm vào yêu thích
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MangaDetailPage
