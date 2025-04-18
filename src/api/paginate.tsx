export type Manga = {
  id: string;
  type: string;
  attributes: {
    title: {
      [lang: string]: string;
    };
    altTitles: {
      [lang: string]: string;
    }[];
    description: {
      [lang: string]: string;
    };
    isLocked: boolean;
    links: {
      [key: string]: string;
    };
    originalLanguage: string;
    lastVolume: string;
    lastChapter: string;
    publicationDemographic: string;
    status: string;
    year: number;
    contentRating: string;
    tags: {
      id: string;
      type: string;
      attributes: {
        name: {
          [lang: string]: string;
        };
        description: {
          [lang: string]: string;
        };
        group: string;
        version: number;
      };
      relationships: any[];
    }[];
    state: string;
    chapterNumbersResetOnNewVolume: boolean;
    createdAt: string;
    updatedAt: string;
    version: number;
    availableTranslatedLanguages: string[];
    latestUploadedChapter: string;
  };
  relationships: {
    id: string;
    type: string;
    attributes?: {
      description: string;
      volume: string;
      fileName: string;
      locale: string;
      createdAt: string;
      updatedAt: string;
      version: number;
    };
  }[];
};


export type dataRespone<T> = {
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
  limit?: number
  offset?: number
  total?: number
}