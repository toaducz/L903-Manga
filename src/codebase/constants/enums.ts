// Trạng thái truyện
export enum MangaStatus {
  ongoing = 'Đang phát hành',
  completed = 'Đã end',
  hiatus = 'Tạm dừng',
  cancelled = 'Đã bị trảm'
}

// Đối tượng độc giả
export enum PublicationDemographic {
  shounen = 'Shounen',
  shoujo = 'Shoujo',
  seinen = 'Seinen',
  josei = 'Josei'
}

// Xếp hạng nội dung
export enum ContentRating {
  safe = 'Phù hợp với mọi lứa tuổi',
  suggestive = 'Có tính gợi dục',
  erotica = 'Ecchi',
  pornographic = 'Nó là Porn'
}

// Ngôn ngữ gốc
export enum OriginalLanguage {
  ja = 'Tiếng Nhật',
  en = 'Tiếng Anh',
  ko = 'Tiếng Hàn',
  zh = 'Tiếng Trung (Giản thể)',
  zh_hk = 'Tiếng Trung (Phồn thể)',
  vi = 'Tiếng Việt'
}

export const getLanguageName = (lang: string) => {
  switch (lang) {
    case 'vi':
      return 'Tiếng Việt'
    case 'en':
      return 'Tiếng Anh'
    default:
      return lang.toUpperCase()
  }
}
