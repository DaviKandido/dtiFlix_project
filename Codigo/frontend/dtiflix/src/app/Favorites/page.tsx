"use client";
import { SidebarCustom } from "../_components/SiderbarCustom";
import { AppCardsCarousel } from "../_components/Carrosel";
import { AppFocusCards } from "../_components/FocusCards";
import { useQuery } from "@tanstack/react-query";
import Movie from "@/@types/movie";
import FavoriteService from "@/services/favorite.service";
import Favorite from "@/@types/favorite";
import {
  IconHeartFilled,
  IconCalendar,
  IconStar,
  IconMovie,
} from "@tabler/icons-react";
import { useState } from "react";

export default function Favorites() {
  const [activeTab, setActiveTab] = useState<"recent" | "all">("recent");

  // Query para últimos favoritos
  const {
    data: recentFavorites,
    isLoading: isLoadingRecent,
    error: recentError,
  } = useQuery<Favorite[]>({
    queryKey: ["favorites", "recent"],
    queryFn: () => FavoriteService.getLastDate({
      limit: 10,
    }),
    placeholderData: [],
  });

  // Query para todos os favoritos
  const {
    data: allFavorites,
    isLoading: isLoadingAll,
    error: allError,
  } = useQuery<Favorite[]>({
    queryKey: ["favorites", "all"],
    queryFn: () =>
      FavoriteService.getAll({
        include: ["Movie"],
        order: [["createdAt", "DESC"]],
      }),
    placeholderData: [],
  });

  // Processar dados
  const recentMovies = (recentFavorites
    ?.map((favorite) => favorite.Movie)
    .filter(Boolean) || []) as Movie[];

  const allMovies = (allFavorites
    ?.map((favorite) => favorite.Movie)
    .filter(Boolean) || []) as Movie[];

  // Estatísticas
  const totalFavorites = allMovies.length;
  const averageRating =
    allMovies.reduce((acc, movie) => acc + (Number(movie.imdbRating) || 0), 0) /
    (allMovies.length || 1);

  const latestYear = allMovies.reduce(
    (latest, movie) => Math.max(latest, movie.year || 0),
    0,
  );

  return (
    <SidebarCustom>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-900/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header com Estatísticas */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-red-500 rounded-2xl">
                <IconHeartFilled className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                Meus Favoritos
              </h1>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Sua coleção pessoal de filmes especiais. Reviva momentos incríveis
              através do cinema.
            </p>

            {/* Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <IconMovie className="w-5 h-5 text-blue-500" />
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {totalFavorites}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Filmes Favoritos
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <IconStar className="w-5 h-5 text-yellow-500" />
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {averageRating.toFixed(1)}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Média IMDb
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <IconCalendar className="w-5 h-5 text-green-500" />
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {latestYear}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Ano Mais Recente
                </p>
              </div>
            </div>
          </div>

          {/* Tabs de Navegação */}
          <div className="flex justify-center mb-12">
            <div className="mt-5 bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("recent")}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === "recent"
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  📅 Recentes
                </button>
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === "all"
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-black shadow-lg"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  🎬 Todos os Favoritos
                </button>
              </div>
            </div>
          </div>

          {/* Conteúdo das Tabs */}
          {activeTab === "recent" ? (
            <div className="space-y-12">
              {/* Últimos Favoritos */}
              <section>
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <IconHeartFilled className="w-6 h-6 text-red-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    Adicionados Recentemente
                  </h2>
                </div>
                <AppCardsCarousel
                  key="recent-favorites"
                  title="Recentes"
                  data={recentMovies}
                  isError={!!recentError}
                  isLoading={isLoadingRecent}
                />
              </section>

              {/* Todos os Favoritos em Grid */}
              {allMovies.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <IconMovie className="w-6 h-6 text-purple-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                      Sua Coleção Completa
                    </h2>
                  </div>
                  <AppFocusCards
                    title=""
                    data={allMovies}
                    isError={!!allError}
                    isLoading={isLoadingAll}
                  />
                </section>
              )}
            </div>
          ) : (
            /* Tab "Todos os Favoritos" */
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  Sua Biblioteca de Filmes
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  {totalFavorites} {totalFavorites === 1 ? "filme" : "filmes"}{" "}
                  que marcaram sua jornada cinematográfica
                </p>
              </div>

              <div className="mt-5">
                <AppFocusCards
                  title="Todos os Seus Favoritos"
                  data={allMovies}
                  isError={!!allError}
                  isLoading={isLoadingAll}
                />
              </div>
            </div>
          )}

          {/* Estado Vazio */}
          {activeTab === "all" && allMovies.length === 0 && !isLoadingAll && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                <IconHeartFilled className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Nenhum favorito ainda
              </h3>
              <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-8">
                Comece a construir sua coleção de filmes favoritos explorando
                nosso catálogo e adicionando os que mais gostar.
              </p>
              <button
                onClick={() => (window.location.href = "/")}
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Explorar Filmes
              </button>
            </div>
          )}
        </div>
      </div>
    </SidebarCustom>
  );
}
