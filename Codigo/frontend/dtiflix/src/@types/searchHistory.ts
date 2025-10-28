import { Movie } from '@/@types/movie';
export interface SearchHistory {
  id: number;
  movies_id: number;
  title: string;
  query?: string | null;
  year: number;
  decade: number;
  genre?: string | null;
  type?: string | null;
  Movie?: Movie;
  searchedAt: Date;
}

export default SearchHistory;