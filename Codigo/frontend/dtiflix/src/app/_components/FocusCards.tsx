"use client";
import { FocusCards } from "@/components/ui/focus-cards";
import { LoaderOne } from "@/components/ui/loader";
import { useQuery } from "@tanstack/react-query";
import MovieService from "@/services/movie.service";
import Movie from "@/@types/movie";
import { checkImageSrc } from "@/utils/trataImg.util";

interface Props {
  title: string;
  data: Movie[];
  search?: string;
  isLoading?: boolean;
  isError?: boolean;
}

export function AppFocusCards({ title, data, isLoading, isError, search }: Props) {


  if (isLoading)
    return (
      <div className="flex flex-col items-center py-16">
        <LoaderOne />
        <p className="mt-4 text-xl text-neutral-500 dark:text-neutral-400">
          Buscando filmes para:{" "}
          <span className="font-semibold text-black dark:text-white">
            "{search}"
          </span>
          ...
        </p>
      </div>
    );

  if (isError || !data?.length)
    return (
      <div className="text-center text-neutral-400 py-10">
        Nenhum filme encontrado
      </div>
    );

  const cards = data.map((movie: Movie) => {
    return {
      title: movie.title,
      src: checkImageSrc(movie.poster),
      id: movie.id,
      // content: <DummyContent movie={movie} index={movie.id} />,
    };
  });



  return (
    <div>
      <h2 className="max-w-7xl pl-4 text-xl md:text-5xl font-bold text-neutral-700  font-sans">
        {title}
      </h2>
      <div className="mt-10">
        <FocusCards cards={cards} />
      </div>
    </div>
  );
}
