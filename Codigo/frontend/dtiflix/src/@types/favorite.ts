import Movie from "./movie";

export interface Favorite {
  id: number;
  movies_id: number;
  createdAt?: Date;
  deletedAt?: Date | null;
  Movie?: Movie;
}


export default Favorite;