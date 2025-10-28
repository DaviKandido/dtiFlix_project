import { api } from "./api.service";
import Movie from "../@types/movie";

export const MovieService = {
  getAll: async (options?: Record<string, any> | Object) => {
    const { data } = await api.get<Movie[]>("/movies", {
      params: { filter: JSON.stringify(options) },
    });
    return data;
  },

  getById: async (id: number) => {
    const { data } = await api.get<Movie>(`/movies/${id}`);
    return data;
  },

  getByTitle: async (title: string, options?: Record<string, any> | Object) => {
    const { data } = await api.get<Movie[]>(`/movies/title/${title}`, {
      params: { filter: JSON.stringify(options) },
    });
    return data;
  },

  getByGenre: async (genre: string, options?: Record<string, any> | Object) => {
    const { data } = await api.get<Movie[]>(`/movies/genre/${genre}`, {
      params: { filter: JSON.stringify(options) },
    });
    return data;
  },

  getByYear: async (year: number, options?: Record<string, any> | Object) => {
    const { data } = await api.get<Movie[]>(`/movies/year/${year}`, {
      params: { filter: JSON.stringify(options) },
    });
    return data;
  },

  getByDecade: async (
    decade: number,
    options?: Record<string, any> | Object,
  ) => {
    const { data } = await api.get<Movie[]>(`/movies/decade/${decade}`, {
      params: { filter: JSON.stringify(options) },
    });
    return data;
  },

  getByImdbID: async (imdbID: string, queryTerm?: string) => {
    const { data } = await api.get<Movie>(
      `/movies/search/${imdbID}/${queryTerm || ""}`,
    );
    return data;
  },

  create: async (movie: Partial<Movie>) => {
    const { data } = await api.post<Movie>("/movies", movie);
    return data;
  },

  update: async (id: number, movie: Partial<Movie>) => {
    const { data } = await api.put<Movie>(`/movies/${id}`, movie);
    return data;
  },

  delete: async (id: number) => {
    const { data } = await api.delete(`/movies/${id}`);
    return data;
  },
};

export default MovieService;
