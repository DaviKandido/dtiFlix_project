export interface StatsCount {
  movies: number;
  pesquisas: number;
  favorites: number;
  reviews: number;
}

export interface TypeCount {
  type: string;
  count: number;
}

export interface GenreCount {
  genre: string;
  count: number;
}

export interface DecadeStats {
  decade: number;
  count: number;
}

export interface ReviewStats {
  media: number;
  total: number;
}

export interface YearSearch {
  year: number;
  count: number;
}