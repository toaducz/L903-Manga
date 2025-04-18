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
  suggestive = 'Gợi cảm nhẹ',
  erotica = 'Khiêu dâm',
  pornographic = 'Khiêu dâm nặng'
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
