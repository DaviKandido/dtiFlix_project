export interface Movie {
  id: number;
  imdbID: string;
  title: string;
  year: number;
  decade: number;
  plot?: string;
  genre?: string;
  rated?: string;
  runtime?: string;
  director?: string;
  actors?: string;
  poster: string;
  imdbRating?: number;
  ratings?: object;
  type?: string;
}

export default Movie;