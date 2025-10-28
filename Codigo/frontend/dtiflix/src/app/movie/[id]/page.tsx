"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import {
  IconHeart,
  IconHeartFilled,
  IconStarFilled,
  IconClock,
  IconCalendar,
  IconUser,
  IconUsers,
  IconArrowLeft,
  IconPlayerPlay,
  IconShare,
} from "@tabler/icons-react";
import { toast } from "sonner";
import MovieService from "@/services/movie.service";
import FavoriteService from "@/services/favorite.service";
import Movie from "@/@types/movie";
import { checkImageSrc } from "@/utils/trataImg.util";
import { SidebarCustom } from "../../_components/SiderbarCustom";
import { AppCardsCarousel } from "../../_components/Carrosel";
import { ReviewSystem } from "@/app/_components/ReviewSystem";

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const movieId = parseInt(params.id as string);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Buscar dados do filme
  const { data: movie, isLoading: movieLoading } = useQuery<Movie>({
    queryKey: ["movie", movieId],
    queryFn: () => MovieService.getById(movieId),
    enabled: !!movieId,
  });

  // Verificar se é favorito
  const { data: isFavorite, isLoading: favoriteLoading } = useQuery({
    queryKey: ["favorite", movieId],
    queryFn: () => FavoriteService.getById(movieId),
    enabled: !!movieId,
  });

  // Buscar filmes similares (por gênero)
  const { data: similarMovies } = useQuery<Movie[]>({
    queryKey: ["similar-movies", movie?.genre],
    queryFn: () =>
      movie?.genre
        ? MovieService.getByGenre(movie.genre.split(",")[0])
        : Promise.resolve([]),
    enabled: !!movie?.genre,
  });

  // Mutation para favoritar/desfavoritar
  const favoriteMutation = useMutation({
    mutationFn: () =>
      isFavorite
        ? FavoriteService.delete(movieId)
        : FavoriteService.create(movieId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite", movieId] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success(
        isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos! 💫",
      );
    },
    onError: () => {
      toast.error("Erro ao atualizar favoritos");
    },
  });

  const handleFavoriteToggle = () => {
    if (movie) {
      favoriteMutation.mutate();
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleShare = async () => {
    if (navigator.share && movie) {
      try {
        await navigator.share({
          title: movie.title,
          text: movie.plot,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Erro ao compartilhar:", err);
      }
    } else {
      // Fallback - copiar para clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado para a área de transferência!");
    }
  };

  if (movieLoading) {
    return (
      <SidebarCustom>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </SidebarCustom>
    );
  }

  if (!movie) {
    return (
      <SidebarCustom>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Filme não encontrado
          </h1>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar
          </button>
        </div>
      </SidebarCustom>
    );
  }

  return (
    <SidebarCustom>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl">
        {/* Header */}
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-colors mb-6"
          >
            <IconArrowLeft size={20} />
            <span>Voltar</span>
          </button>
        </div>

        {/* Conteúdo Principal */}
        <div className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Poster e Ações */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                {/* Poster */}
                <div className="relative group">
                  <div
                    className={`relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl ${
                      isImageLoading ? "bg-slate-200 animate-pulse" : ""
                    }`}
                  >
                    <Image
                      src={checkImageSrc(movie.poster)}
                      alt={movie.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      onLoad={() => setIsImageLoading(false)}
                      onError={(e) => {
                        e.currentTarget.src = "/404-img.jpg";
                        setIsImageLoading(false);
                      }}
                    />
                  </div>

                  {/* Badge de Tipo */}
                  {movie.type && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full capitalize">
                        {movie.type}
                      </span>
                    </div>
                  )}
                </div>

                {/* Ações Rápidas */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleFavoriteToggle}
                    disabled={favoriteMutation.isPending || favoriteLoading}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      isFavorite
                        ? "bg-red-500 text-white hover:bg-red-600 shadow-lg"
                        : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {favoriteMutation.isPending ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : isFavorite ? (
                      <>
                        <IconHeartFilled size={20} />
                        Favoritado
                      </>
                    ) : (
                      <>
                        <IconHeart size={20} />
                        Favoritar
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-colors"
                  >
                    <IconShare size={20} />
                  </button>
                </div>

                {/* Informações Rápidas */}
                <div className="mt-6 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-4">
                    Informações
                  </h3>

                  <div className="space-y-3">
                    {movie.year && (
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                        <IconCalendar size={18} className="text-blue-500" />
                        <span>Ano: {movie.year}</span>
                      </div>
                    )}

                    {movie.runtime && (
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                        <IconClock size={18} className="text-green-500" />
                        <span>Duração: {movie.runtime}</span>
                      </div>
                    )}

                    {movie.rated && (
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                        <div className="w-4 h-4 flex items-center justify-center">
                          <span className="text-xs font-bold text-orange-500">
                            C
                          </span>
                        </div>
                        <span>Classificação: {movie.rated}</span>
                      </div>
                    )}

                    {movie.imdbRating && (
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                        <IconStarFilled size={18} className="text-yellow-500" />
                        <span>IMDb: {movie.imdbRating}/10</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Detalhes do Filme */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                {/* Header do Conteúdo */}
                <div className="p-8 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                        {movie.title}
                      </h1>
                      <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-300">
                        {movie.year && <span>{movie.year}</span>}
                        {movie.genre && (
                          <>
                            <span>•</span>
                            <span>{movie.genre}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {movie.imdbRating && (
                      <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-4 py-2 rounded-full">
                        <IconStarFilled size={20} className="text-yellow-500" />
                        <span className="font-bold text-yellow-700 dark:text-yellow-400">
                          {movie.imdbRating}
                        </span>
                        <span className="text-yellow-600 dark:text-yellow-500 text-sm">
                          IMDb
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sinopse */}
                {movie.plot && movie.plot !== "N/A" && (
                  <div className="p-8 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                      Sinopse
                    </h2>
                    <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                      {movie.plot}
                    </p>
                  </div>
                )}

                {/* Equipe */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                  {movie.director && movie.director !== "N/A" && (
                    <div>
                      <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-white mb-3">
                        <IconUser size={20} className="text-blue-500" />
                        Diretor
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300">
                        {movie.director}
                      </p>
                    </div>
                  )}

                  {movie.actors && movie.actors !== "N/A" && (
                    <div>
                      <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-white mb-3">
                        <IconUsers size={20} className="text-green-500" />
                        Elenco
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300">
                        {movie.actors}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Filmes Similares */}
              {similarMovies && similarMovies.length > 0 && (
                <div className="mt-12">
                  <AppCardsCarousel
                    title="Filmes Similares"
                    data={similarMovies}
                    isLoading={false}
                    isError={false}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <ReviewSystem movieId={movie.id} movieTitle={movie.title} />
      </div>
    </SidebarCustom>
  );
}
