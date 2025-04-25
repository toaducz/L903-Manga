import { useQuery } from '@tanstack/react-query'
import { getTag } from '@/api/Tag/getTag'
import { useState, useEffect } from 'react'

type TagMultiSelectProps = {
  setTag: (tags: string[]) => void
  selectedTags: string[]
}

export default function TagMultiSelect({ setTag, selectedTags }: TagMultiSelectProps) {
  const { data } = useQuery(getTag())
  const tags = data?.data ?? []

  const [selected, setSelected] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false) // Trạng thái ẩn/hiện

  console.log('selected', selected)

  useEffect(() => {
    setSelected(selectedTags)
  }, [selectedTags])

  const toggleTag = (id: string) => {
    setSelected(prev => (prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]))
  }

  const handleConfirm = () => {
    setTag(selected)
    setIsOpen(false) // Ẩn sau khi xác nhận
  }

  const toggleOpen = () => {
    setIsOpen(prev => !prev)
  }

  // Bỏ chọn tag từ danh sách ngoài
  const removeTag = (id: string) => {
    setSelected(prev => prev.filter(t => t !== id))
  }

  // Xóa hết tag
  const clearAllTags = () => {
    setSelected([])
    setTag([])
  }

  return (
    <div className='relative max-w-2xl mx-auto'>
      {/* Nút toggle */}
      <div className='px-5 md:px-1'>
        <button
          className='w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-[1.02]'
          onClick={toggleOpen}
        >
          {isOpen ? 'Đóng' : `Chọn thể loại ${selected.length > 0 ? `(${selected.length})` : ''}`}
        </button>

        {/* Danh sách tag đã chọn (hiển thị bên ngoài) */}
        {selected.length > 0 && (
          <div className='mt-3 flex flex-wrap gap-3'>
            {selected.map(id => {
              const tag = tags.find(t => t.id === id)
              return tag ? (
                <div
                  key={id}
                  className='flex items-center px-3 py-1.5 bg-blue-600 text-white border border-blue-600 rounded-full text-sm font-medium transition-all duration-200 ease-in-out'
                >
                  <span>{tag.attributes.name.en}</span>
                  <button
                    className='ml-2 text-white hover:text-gray-200 focus:outline-none'
                    onClick={() => removeTag(id)}
                    aria-label={`Bỏ chọn ${tag.attributes.name.en}`}
                  >
                    <svg
                      className='w-4 h-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                    </svg>
                  </button>
                </div>
              ) : null
            })}
            <button
              className='px-3 py-1.5 bg-red-600 text-white font-medium rounded-full shadow-sm hover:bg-red-700 focus:ring-4 focus:ring-red-300 focus:ring-opacity-50 transition-all duration-200 ease-in-out'
              onClick={clearAllTags}
              aria-label='Xóa hết tag'
            >
              Xóa hết
            </button>
          </div>
        )}
      </div>

      {/* Danh sách tag và nút xác nhận (ẩn/hiện) */}
      <div
        className={`mt-4 space-y-6 px-6 bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out transform ${
          isOpen ? 'opacity-100 translate-y-0 max-h-[500px]' : 'opacity-0 -translate-y-4 max-h-0 overflow-hidden'
        }`}
      >
        {/* Tiêu đề */}
        <h3 className='text-lg font-semibold text-gray-800'>Chọn thể loại</h3>

        {/* Danh sách tag */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2'>
          {tags.map(tag => (
            <label
              key={tag.id}
              className={`flex items-center justify-center cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 ${
                selected.includes(tag.id)
                  ? 'bg-blue-600 text-white border border-blue-600 shadow-md'
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
              onClick={() => toggleTag(tag.id)}
            >
              {tag.attributes.name.en}
            </label>
          ))}
        </div>

        {/* Nút xác nhận */}
        <button
          className='w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-[1.02] disabled:bg-gray-400 disabled:cursor-not-allowed'
          onClick={handleConfirm}
          disabled={selected.length === 0}
        >
          Xác nhận
        </button>
      </div>
    </div>
  )
}
