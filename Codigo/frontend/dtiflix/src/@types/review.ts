import Movie from "./movie";

export interface Review {
  id: number;
  movie_id: number;
  comment: string;
  rating: number ;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  Movie?: Movie;
}

export default Review;
