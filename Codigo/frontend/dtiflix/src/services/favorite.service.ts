import { api } from "./api.service";
import Favorite from "../@types/favorite";

export const FavoriteService = {
  getAll: async (options?: Record<string, any>) => {
    const { data } = await api.get<Favorite[]>("/favorites", {
      params: { filter: JSON.stringify(options) },
    });
    return data;
  },

  getById: async (id: number) => {
    const { data } = await api.get<Favorite>(`/favorites/${id}`);
    return data;
  },

  getByImdbID: async (imdbID: string) => {
    const { data } = await api.get<Favorite>(`/favorites/search/${imdbID}`);
    return data;
  },

  getLastDate: async (options?: Record<string, any>) => {
    const { data } = await api.get<Favorite[]>("/favorites/last-date", {
      params: { filter: JSON.stringify(options) },
    });
    return data;
  },

  create: async (movieId: number | { id: number }) => {
    const movie_id = typeof movieId === "object" ? movieId.id : movieId;
    const { data } = await api.post<Favorite>("/favorites", { movie_id });
    return data;
  },

  update: async (id: number, body: Partial<Favorite>) => {
    const { data } = await api.put<Favorite>(`/favorites/${id}`, body);
    return data;
  },

  delete: async (id: number) => {
    const { data } = await api.delete(`/favorites/${id}`);
    return data;
  },

  deleteAll: async (options?: Record<string, any>) => {
    const { data } = await api.delete("/favorites", {
      params: { filter: JSON.stringify(options) },
    });
    return data;
  },
};

export default FavoriteService;
