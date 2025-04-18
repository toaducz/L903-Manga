export type Manga = {
  id: string
  type: string
  attributes: {
    title: {
      [lang: string]: string
    }
    altTitles: {
      [lang: string]: string
    }[]
    description: {
      [lang: string]: string
    }
    isLocked: boolean
    links: {
      [key: string]: string
    }
    originalLanguage: string
    lastVolume: string
    lastChapter: string
    publicationDemographic: string
    status: string
    year: number
    contentRating: string
    tags: {
      id: string
      type: string
      attributes: {
        name: {
          [lang: string]: string
        }
        description: {
          [lang: string]: string
        }
        group: string
        version: number
      }
      relationships: unknown[]
    }[]
    state: string
    chapterNumbersResetOnNewVolume: boolean
    createdAt: string
    updatedAt: string
    version: number
    availableTranslatedLanguages: string[]
    latestUploadedChapter: string
  }
  relationships: {
    id: string
    type: string
    attributes?: {
      description: string
      volume: string
      fileName: string
      locale: string
      createdAt: string
      updatedAt: string
      version: number
    }
  }[]
}

export type Author = {
  id: string // ID của tác giả
  type: 'author' // Loại dữ liệu là "author"
  attributes: {
    name: string // Tên tác giả
    imageUrl: string | null // URL hình ảnh của tác giả (nếu có)
    biography: {
      en: string // Tiểu sử tác giả bằng tiếng Anh
    }
    twitter: string | null // URL Twitter của tác giả (nếu có)
    pixiv: string | null // URL Pixiv của tác giả (nếu có)
    melonBook: string | null // URL MelonBook của tác giả (nếu có)
    fanBox: string | null // URL FanBox của tác giả (nếu có)
    booth: string | null // URL Booth của tác giả (nếu có)
    namicomi: string | null // URL Namicomi của tác giả (nếu có)
    nicoVideo: string | null // URL NicoVideo của tác giả (nếu có)
    skeb: string | null // URL Skeb của tác giả (nếu có)
    fantia: string | null // URL Fantia của tác giả (nếu có)
    tumblr: string | null // URL Tumblr của tác giả (nếu có)
    youtube: string | null // URL YouTube của tác giả (nếu có)
    weibo: string | null // URL Weibo của tác giả (nếu có)
    naver: string | null // URL Naver của tác giả (nếu có)
    website: string | null // Website của tác giả (nếu có)
    createdAt: string // Ngày tạo tác giả
    updatedAt: string // Ngày cập nhật thông tin tác giả
    version: number // Phiên bản của thông tin tác giả
  }
  relationships: Array<{
    id: string // ID của mối quan hệ
    type: 'manga' // Loại quan hệ là manga
  }>
}

export type DataResponse<T> = {
  result: string
  response: string
  data: T[]
  limit: number
  offset: number
  total: number
}

export type Detail<T> = {
  result: string
  response: string
  data: T
}
