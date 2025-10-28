"use client";
import Movie from "@/@types/movie";
import FavoriteService from "@/services/favorite.service";
import ReviewService from "@/services/review.service";
import { checkImageSrc } from "@/utils/trataImg.util";
import {
  IconHeart,
  IconHeartFilled,
  IconTrash,
  IconStar,
  IconClock,
  IconUser,
  IconUsers,
  IconMovie,
  IconCategory,
} from "@tabler/icons-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { ReviewSystem } from "./ReviewSystem";

const DummyContent = ({ movie, index }: { movie: Movie; index: number }) => {
  const queryClient = useQueryClient();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Query para verificar se é favorito
  const {
    data: isFavorite,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favorite", movie.id],
    queryFn: () => FavoriteService.getById(movie.id),
  });

  // Mutation para favoritar/desfavoritar
  const favoriteMutation = useMutation({
    mutationFn: () =>
      isFavorite
        ? FavoriteService.delete(movie.id)
        : FavoriteService.create(movie.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite", movie.id] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast.success(
        isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos! 💫",
      );
    },
    onError: () => {
      toast.error(`Erro ao ${isFavorite ? "remover" : "adicionar"} favorito`);
    },
  });

  console.log(isFavorite);

  const handleFavoriteToggle = () => {
    favoriteMutation.mutate();
  };

  const isLoadingAction = favoriteMutation.isPending;

  return (
    <div
      key={"dummy-content" + index}
      className="group bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 flex flex-col p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-600 hover:scale-[1.02]"
    >
      {/* Header com Título e Ano */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {movie.title !== "N/A" ? movie.title : "Sem título"}
        </h2>
        {movie.year && (
          <p className="text-slate-500 dark:text-slate-400 text-lg mt-1">
            {movie.year}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Poster com Efeito */}
        <div className="relative">
          <div
            className={`relative trasnp aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:7 ${
              imageLoading
                ? "bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 animate-pulse"
                : ""
            }`}
          >
            <Image
              src={checkImageSrc(movie.poster) || "/404-img.jpg"}
              alt={movie.title || "Sem título"}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 "
              onLoad={() => setImageLoading(false)}
              onError={(e) => {
                e.currentTarget.src = "/404-img.jpg";
                setImageLoading(false);
              }}
            />
            {/* Badge de Tipo */}
            {movie.type && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full capitalize shadow-lg">
                  {movie.type}
                </span>
              </div>
            )}
            {/* Overlay no Hover */}
            {imageLoading && (
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
            )}{" "}
          </div>
        </div>

        {/* Informações do Filme */}
        <div className="space-y-6">
          {/* Sinopse */}
          {movie.plot && movie.plot !== "N/A" && (
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                <IconMovie className="w-5 h-5 text-blue-500" />
                Sinopse
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-justify line-clamp-4">
                {movie.plot}
              </p>
            </div>
          )}

          {/* Detalhes em Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Diretor */}
            {movie.director && movie.director !== "N/A" && (
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <IconUser className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Diretor
                  </p>
                  <p className="text-slate-800 dark:text-white font-medium truncate">
                    {movie.director}
                  </p>
                </div>
              </div>
            )}

            {/* Elenco */}
            {movie.actors && movie.actors !== "N/A" && (
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <IconUsers className="w-5 h-5 text-green-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Elenco
                  </p>
                  <p className="text-slate-800 dark:text-white font-medium line-clamp-1">
                    {movie.actors.split(",").slice(0, 2).join(", ")}
                    {movie.actors.split(",").length > 2 && "..."}
                  </p>
                </div>
              </div>
            )}

            {/* Duração */}
            {movie.runtime && movie.runtime !== "N/A" && (
              <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                <IconClock className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Duração
                  </p>
                  <p className="text-slate-800 dark:text-white font-medium">
                    {movie.runtime}
                  </p>
                </div>
              </div>
            )}

            {/* Nota IMDb */}
            {movie.imdbRating && (
              <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                <IconStar className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    IMDb
                  </p>
                  <p className="text-slate-800 dark:text-white font-medium">
                    {movie.imdbRating}/10
                  </p>
                </div>
              </div>
            )}

            {/* Gênero */}
            {movie.genre && movie.genre !== "N/A" && (
              <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <IconCategory className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Gênero
                  </p>
                  <p className="text-slate-800 dark:text-white font-medium truncate">
                    {movie.genre}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Ações de Favorito */}
          <div className="flex flex-col items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-600">
            {/* Status */}
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                isLoading
                  ? "bg-slate-100 text-slate-500 dark:bg-slate-700"
                  : isFavorite
                    ? "dark:bg-red-100dark: text-red-700 border dark:border-red-200 bg-red-900/30 dark:text-red-300 border-red-700"
                    : "dark:bg-blue-100 dark:text-blue-700 border dark:border-blue-200 bg-blue-900/30 text-blue-300 border-blue-700"
              }`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
              ) : isFavorite ? (
                <IconHeartFilled className="w-4 h-4" color="red" />
              ) : (
                <IconHeart className="w-4 h-4" color="blue" />
              )}
              <span
                className={`text-sm font-medium ${isFavorite ? "dark:text-red-500 text-red-500" : "dark:text-blue-500 text-blue-500"}`}
              >
                {isLoading
                  ? "Verificando..."
                  : isFavorite
                    ? "Nos seus favoritos"
                    : "Adicionar aos favoritos"}
              </span>
            </div>

            {/* Botão Principal */}
            <button
              onClick={handleFavoriteToggle}
              disabled={isLoading || isLoadingAction}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`
                relative flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300 transform 
                hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                shadow-lg hover:shadow-xl w-full justify-center
                ${
                  isFavorite
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                }
              `}
            >
              {isLoadingAction ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isFavorite ? (
                <>
                  <IconTrash className="w-5 h-5" />
                  Remover dos Favoritos
                </>
              ) : (
                <>
                  <IconHeartFilled className="w-5 h-5" />
                  Favoritar Filme
                </>
              )}
            </button>

            {/* Status da Ação */}
            <div className="text-xs text-slate-500 dark:text-slate-400 text-center h-4">
              {isLoadingAction && "Processando..."}
              {error && "Erro ao carregar status"}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-5">
        <ReviewSystem movieId={movie.id} movieTitle={movie.title} />
      </div>
    </div>
  );
};

export default DummyContent;
