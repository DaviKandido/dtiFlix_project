"use client";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { SidebarCustom } from "../_components/SiderbarCustom";
import { AppCardsCarousel } from "../_components/Carrosel";
import { AppFocusCards } from "../_components/FocusCards";
import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import MovieService from "@/services/movie.service";
import Movie from "@/@types/movie";
import {
  IconSearch,
  IconStar,
  IconTrendingUp,
  IconMovie,
  IconHeart,
  IconSparkles,
} from "@tabler/icons-react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showHero, setShowHero] = useState<boolean>(true);

  const placeholders = [
    "O que é a Matrix?",
    "Quem é Rosebud?",
    "Qual o número de ouro?",
    "Onde está o cofre?",
    "Me diga: você está com sorte, punk?",
    "Procure por aventura, romance, ação...",
    "Qual filme ganhou o Oscar em 2020?",
  ];

  // Query para filmes
  const {
    data: searchResults,
    isLoading,
    isFetching,
    error: searchError,
  } = useQuery<Movie[]>({
    queryKey: ["movies", searchTerm],
    queryFn: () =>
      searchTerm && searchTerm.length > 0
        ? MovieService.getByTitle(searchTerm)
        : MovieService.getAll({
          order: [["imdbRating", "DESC"]],
          limit: 50,
        }),
    placeholderData: [],
  });

  // Query para filmes populares
  const { data: popularMovies, isLoading: isLoadingPopular, error: popularError, isFetching: isFetchingPopular } = useQuery<
    Movie[]
  >({
    queryKey: ["movies", "popular"],
    queryFn: () =>
      MovieService.getAll({
        order: [["imdbRating", "DESC"]],
        limit: 10,
      }),
    placeholderData: [],
  });

  // Query para filmes recentes
  const { data: recentMovies, isLoading: isLoadingRecent, error: recentError, isFetching: isFetchingRecent } = useQuery<Movie[]>({
    queryKey: ["movies", "recent"],
    queryFn: () =>
      MovieService.getAll({
        order: [["year", "DESC"]],
        limit: 8,
      }),
    placeholderData: [],
  });

  // Efeito para mostrar/ocultar hero baseado no scroll e search
  useEffect(() => {
    if (isSearching) {
      setShowHero(false);
    }
  }, [isSearching]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === "") {
      setIsSearching(false);
      setShowHero(true);
    } else {
      setIsSearching(true);
    }
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (searchTerm.trim() !== "") {
        setIsSearching(true);
        setShowHero(false);
      } else {
        setIsSearching(false);
        setShowHero(true);
      }
    },
    [searchTerm],
  );

  const handleClearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
    setShowHero(true);
  };

  const showDefaultContent = !isSearching;

  // Filtrar filmes com poster válido para diferentes seções
  const validMovies = Array.isArray(searchResults)
    ? searchResults?.filter(
        (movie) => movie.poster && movie.poster !== "N/A",
      ) || []
    : [];
  const validPopularMovies = Array.isArray(popularMovies)
    ? popularMovies?.filter(
        (movie) => movie.poster && movie.poster !== "N/A",
      ) || []
    : [];
  const validRecentMovies = Array.isArray(recentMovies)
    ? recentMovies?.filter((movie) => movie.poster && movie.poster !== "N/A") ||
      []
    : [];

  return (
    <SidebarCustom>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20 rounded-3xl">
        <div className="flex flex-col items-center w-full">
          {/* Hero Section */}
          
            <div className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16 md:py-24 rounded-3xl">
              <div className="container mx-auto px-4 text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <IconSparkles className="w-8 h-4 text-yellow-300" />
                  <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-white bg-gradient-to-r from-yellow-300 to-pink-300 ">
                    DtiFlix
                  </h1>
                </div>

                <p className="my-10 text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Descubra, explore e viva experiências cinematográficas
                  incríveis
                </p>

                <div className="max-w-2xl mx-auto mb-12">
                  <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    onChange={handleChange}
                    onSubmit={onSubmit}
                  />
                </div>

                {/* Stats Quick View */}
                <div className="flex flex-row items-center justify-center gap-4 mt-10">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold dark:text-blue-100  mb-1">
                      {validRecentMovies.length}+
                    </div>
                    <div className="text-blue-100 text-sm">Filmes Recentes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold dark:text-blue-100  mb-1">
                      {validPopularMovies.length}+
                    </div>
                    <div className="text-blue-100  text-sm">
                      Altas Avaliações
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-blue-100  mb-1">
                      10+
                    </div>
                    <div className="text-blue-100  text-sm">Gêneros</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-blue-100  mb-1">
                      2025
                    </div>
                    <div className="text-blue-100  text-sm">Atualizado</div>
                  </div>
                </div>
              </div>
            </div>


          {/* Search Header */}
          {/* {!showHero && (
            <div className="w-full bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-8">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                      <IconSearch className="w-8 h-8 text-blue-600" />
                      {isSearching
                        ? "Resultados da Busca"
                        : "Explorar Catálogo"}
                    </h2>
                    {isSearching && (
                      <p className="text-slate-600 dark:text-slate-300 mt-2">
                        Resultados para:{" "}
                        <span className="font-semibold text-blue-600">
                          "{searchTerm}"
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    {isSearching && (
                      <button
                        onClick={handleClearSearch}
                        className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        Limpar busca
                      </button>
                    )}
                    <div className="w-80">
                      <PlaceholdersAndVanishInput
                        placeholders={placeholders}
                        onChange={handleChange}
                        onSubmit={onSubmit}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )} */}

          {/* Conteúdo Principal */}
          <div className="container mx-auto px-4 py-4 w-full">
            {showDefaultContent ? (
              <div className="space-y-16">
                {/* Seção de Filmes Populares */}
                <section>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-2xl">
                      <IconTrendingUp className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <h2 className="text-3xl  font-bold text-slate-900 dark:text-white">
                        Populares no DtiFlix
                      </h2>
                      <p className="text-slate-600 dark:text-slate-300">
                        Os filmes mais bem avaliados pela comunidade
                      </p>
                    </div>
                  </div>
                  <AppCardsCarousel
                    isLoading={isFetchingPopular}
                    isError={false}
                    data={validPopularMovies}
                    title=""
                  />
                </section>

                {/* Seção de Filmes Recentes */}
                <section>
                  <div className="flex items-center gap-3 ">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-2xl">
                      <IconMovie className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Lançamentos Recentes
                      </h2>
                      <p className="text-slate-600 dark:text-slate-300">
                        As novidades mais recentes do cinema
                      </p>
                    </div>
                  </div>
                  <AppCardsCarousel
                    isLoading={isFetchingRecent}
                    isError={false}
                    data={validRecentMovies}
                    title=""
                  />
                </section>

                {/* Seção de Todos os Filmes */}
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                      <IconStar className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Catálogo Completo
                      </h2>
                      <p className="text-slate-600 dark:text-slate-300">
                        Explore nossa coleção completa de filmes
                      </p>
                    </div>
                  </div>
                  <AppFocusCards
                    data={validMovies}
                    title=""
                    isLoading={isFetching}
                    isError={!!searchError}
                  />
                </section>
              </div>
            ) : (
              /* Modo Busca */
              <div className="space-y-8">
                {/* Header dos Resultados */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mt-2">
                      <IconSearch className="w-6 h-6 text-blue-500" />
                      {searchResults?.length || 0} resultados encontrados
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mt-2">
                      Para:{" "}
                      <span className="font-semibold text-blue-600">
                        "{searchTerm}"
                      </span>
                    </p>
                  </div>
                </div>

                {/* Resultados da Busca */}
                <AppFocusCards
                  isLoading={isFetching}
                  isError={!!searchError}
                  data={validMovies}
                  title=""
                  search={searchTerm}
                />

                {/* Sugestões quando não há resultados */}
                {!isLoading && validMovies.length === 0 && (
                  <div className="text-center py-12">
                    <IconSearch className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      Nenhum resultado encontrado
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                      Tente usar palavras-chave diferentes ou explorar nosso
                      catálogo completo
                    </p>
                    <button
                      onClick={handleClearSearch}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Ver Catálogo Completo
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarCustom>
  );
}
