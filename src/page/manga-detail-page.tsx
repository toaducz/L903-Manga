import React, { useState } from 'react'
import { Manga } from '@/api/paginate'
import Image from 'next/image'
import { translateText } from '@/utils/translate'
import { MangaStatus, OriginalLanguage, ContentRating } from '@/utils/enums'
import { getAuthorById } from '@/api/Author/getAuthorById'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { splitTextIntoChunks } from '@/utils/format'
import { contentRatingColors } from '@/utils/static'
import { Center } from 'zmp-ui'
import ReactMarkdown from 'react-markdown'
import MangaChaptersList from '@/component/manga/manga-chapter-list'
import Loading from '@/component/status/Loading'
import Error from '@/component/status/error'
import { getChaptersByMangaId } from '@/api/Manga/getChapter'
import { getLanguageName } from '@/utils/enums'
import RelatedManga from '@/component/manga/related-manga'

interface MangaDetailPageProps {
  manga: Manga
}

const MangaDetailPage: React.FC<MangaDetailPageProps> = ({ manga }) => {
  const router = useRouter()
  const [isTranslate, setIsTranslate] = useState(false)
  const [activeTab, setActiveTab] = useState<'chapters' | 'related'>('chapters')
  const [translatedDescription, setTranslatedDescription] = useState<string>('')
  const attributes = manga.attributes
  const isVietnameseAvailable = attributes.availableTranslatedLanguages.includes('vi')
  const lang = attributes.availableTranslatedLanguages.includes('vi') ? 'vi' : 'en'
  const coverArt = manga.relationships.find(rel => rel.type === 'cover_art')
  const coverArtFileName = coverArt?.attributes?.fileName
  const coverImageUrl = coverArtFileName ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArtFileName}` : ''
  const proxyImageUrl = `/api/image?url=${encodeURIComponent(coverImageUrl)}`
  const [isLoadings, setIsLoading] = useState(false)
  const authorId = manga.relationships.find(item => item.type === 'author')?.id
  const { data: author, isLoading, isError } = useQuery(getAuthorById({ id: authorId! }))
  const { data: chapter } = useQuery(getChaptersByMangaId({ id: manga.id, lang: [lang] }))
  const firstChapterId = chapter?.data.length !== 0 ? chapter?.data[0].id : ''
  const relatedMangaIds = manga.relationships.filter(rel => rel.type === 'manga').map(rel => rel.id)

  const handleTranslate = async (text: string) => {
    if (!isTranslate && !translatedDescription) {
      setIsLoading(true)
      try {
        const chunks = splitTextIntoChunks(text)
        const translatedChunks: string[] = []
        for (const chunk of chunks) {
          const translated = await translateText(chunk)
          translatedChunks.push(translated)
        }
        setTranslatedDescription(translatedChunks.join(' '))
        setIsTranslate(true)
      } catch (error: unknown) {
        console.error('Translation failed:', error)
        let errorMessage = ''
        if (error instanceof Error) {
          errorMessage = (error as Error).message
        }
        if (errorMessage.includes('MYMEMORY WARNING')) {
          const timeMatch = errorMessage.match(/IN\s+(\d+)\s+HOURS\s+(\d+)\s+MINUTES\s+(\d+)\s+SECONDS/i)
          if (timeMatch) {
            const hours = timeMatch[1]
            const minutes = timeMatch[2]
            const seconds = timeMatch[3]
            setTranslatedDescription(
              `Lỗi khi dịch: Không thể dịch được, xin vui lòng thử lại sau ${hours} giờ ${minutes} phút ${seconds} giây.`
            )
          } else {
            setTranslatedDescription('Lỗi khi dịch: Không thể dịch được, xin vui lòng thử lại sau một thời gian.')
          }
        } else {
          setTranslatedDescription('Lỗi khi dịch: Đã xảy ra lỗi không xác định. Vui lòng thử lại sau.')
        }
        setIsTranslate(true)
      } finally {
        setIsLoading(false)
      }
    } else {
      setIsTranslate(!isTranslate)
    }
  }

  // useEffect(() => {
  //   console.log(activeTab)
  // },[activeTab])

  const rating = manga.attributes.contentRating as keyof typeof ContentRating

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  return (
    <div className='relative min-h-screen'>
      {/* Background Layer */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        <Image
          unoptimized
          src={proxyImageUrl}
          alt='Blur Background'
          fill
          className='object-cover blur-lg opacity-7 pointer-events-none'
        />
        <div className='absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] opacity-70 pointer-events-none' />
      </div>

      {/* Content Layer */}
      <div className='relative z-20 pt-16'>
        <div className='max-w-6xl mx-auto p-6 md:px-12 pt-12 pb-8'>
          <div className='flex flex-col md:flex-row items-start gap-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6'>
            {/* Cover Image */}
            <div className='w-full md:w-[300px] flex-shrink-0'>
              <Image
                unoptimized
                src={proxyImageUrl}
                alt='Manga Cover'
                width={300}
                height={450}
                placeholder='blur'
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPJ7eB1wAAAABJRU5ErkJggg=='
                className='object-cover rounded-xl shadow-md w-full'
              />
              <div className='p-5'>
                <Center intrinsic>
                  <div>
                    {rating && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${contentRatingColors[rating]}`}>
                        {ContentRating[rating]}
                      </span>
                    )}
                  </div>
                </Center>
              </div>
            </div>

            {/* Manga Details */}
            <div className='flex-1 space-y-6'>
              <div>
                <h1 className='text-4xl font-bold text-white mb-2'>
                  {attributes.altTitles.find(item => item.vi)?.vi ?? attributes.title.en}
                </h1>
                {attributes.altTitles.find(item => item.vi)?.vi ? (
                  <p className='text-gray-400 italic text-lg'>{attributes.altTitles.find(item => item.en)?.en}</p>
                ) : (
                  <p className='text-gray-400 italic text-lg'>{attributes.altTitles.find(item => item.ja)?.ja}</p>
                )}
              </div>

              {/* Description + Translation */}
              <div className='space-y-2 text-gray-100 text-base leading-relaxed'>
                <div>
                  {isTranslate ? (
                    <ReactMarkdown>{translatedDescription}</ReactMarkdown>
                  ) : (
                    attributes.description.vi || <ReactMarkdown>{attributes.description.en}</ReactMarkdown> ||
                    'Không có mô tả'
                  )}
                </div>

                {isLoadings && <p className='text-sm text-blue-400 italic'>Đang dịch nội dung, vui lòng chờ...</p>}

                <div className='flex items-center gap-2 py-2'>
                  <span
                    onClick={() => handleTranslate(attributes.description.en)}
                    className='text-sm cursor-pointer underline font-bold hover:underline hover:font-bold hover:text-gray-300'
                  >
                    {isTranslate ? 'Hiện nội dung gốc' : 'Dịch nội dung sang tiếng Việt'}
                  </span>
                </div>

                {!isVietnameseAvailable ? (
                  <p className='text-red-500 font-medium'>Truyện hiện tại chưa có Tiếng Việt</p>
                ) : (
                  <p className='text-green-500 font-medium'>Truyện có bản dịch Tiếng Việt</p>
                )}
              </div>

              {/* Genre tags */}
              {attributes.tags?.length > 0 && (
                <div className='flex flex-wrap gap-2 pt-4'>
                  {attributes.tags.map(tag => (
                    <span key={tag.id} className='bg-blue-700 text-white px-3 py-1 text-xs rounded-full'>
                      {tag.attributes.name.en}
                    </span>
                  ))}
                </div>
              )}

              {/* Manga Info */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-200 mt-4'>
                <div>
                  <span className='font-bold'>Tình trạng: </span>
                  <span>{MangaStatus[attributes.status as keyof typeof MangaStatus] || 'Không rõ'}</span>
                </div>
                <div>
                  <span className='font-bold'>Năm phát hành: </span>
                  <span>{attributes.year || 'Không rõ'}</span>
                </div>
                <div>
                  <span className='font-bold'>Tác giả: </span>
                  <span
                    className='text-sm cursor-pointer hover:underline hover:text-blue-300'
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

              {/* Action Buttons */}
              <div className='pt-6 flex flex-wrap gap-4'>
                <button
                  className='px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition'
                  onClick={() => {
                    router.push(
                      `/reader/${firstChapterId}?mangaId=${manga.id}&lang=${getLanguageName(lang)}&langFilter=${lang}&langValue=${lang}&chapterId=${firstChapterId}`
                    )
                  }}
                >
                  Đọc Truyện
                </button>
                <button className='px-5 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition'>
                  Thêm vào yêu thích
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className='w-full flex justify-center items-center gap-4 sm:gap-6 z-40 pointer-events-auto bg-transparent pt-1'>
          <button
            className={`px-4 sm:px-6 py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 pointer-events-auto ${activeTab === 'chapters'
              ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
              : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            onClick={() => {
              setActiveTab('chapters')
            }}
          >
            Danh sách chương
          </button>
          <button
            className={`px-4 sm:px-6 py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 pointer-events-auto ${activeTab === 'related'
              ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
              : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            onClick={() => {
              setActiveTab('related')
            }}
          >
            Manga liên quan
          </button>
        </div>

        {/* Tab Content */}
        <div className='max-w-6xl mx-auto p-6 z-20'>
          {activeTab === 'chapters' && (
            <MangaChaptersList mangaId={manga.id} langValue={'vi'} langFilterValue={['vi']} />
          )}
          {activeTab === 'related' && (
            <RelatedManga ids={relatedMangaIds} />
            // <div className="text-gray-200">Nội dung manga liên quan (chưa triển khai)</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MangaDetailPage
