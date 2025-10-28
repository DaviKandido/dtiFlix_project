"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { LoaderOne } from "@/components/ui/loader";
import Movie from "@/@types/movie";
import DummyContent from "./DumyContent";

interface Props {
  title: string;
  data: Movie[];
  isLoading?: boolean;
  isError?: boolean;
  description?: string;
}

export function AppCardsCarousel({
  title,
  data,
  isLoading,
  isError,
  description,
}: Props) {
  if (isLoading)
    return (
      <div className="flex flex-col items-center py-16">
        <LoaderOne />
        <p className="mt-4 text-xl text-neutral-500 dark:text-neutral-400">
          Buscando seus favoritos..
          <span className="font-semibold text-black dark:text-white">
            "{description}"
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

  const cardsData = data.map((movie) => {
    return {
      category: movie.genre || "Filme",
      title: movie.title,
      src: movie.poster,
      content: <DummyContent movie={movie} index={movie.id} />,
    };
  });

  const cards = cardsData.map((card: any, index) => (
    <Card key={card.src || index} card={card} index={index} layout />
  ));

  return (
    <div className="pt-1">
      <h2 className=" pl-2 mx-auto text-xl md:text-5xl font-bold text-neutral-600 font-sans">
        {title}
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
