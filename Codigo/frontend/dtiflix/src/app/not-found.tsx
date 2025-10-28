"use client";
import Link from "next/link";
import { SidebarCustom } from "./_components/SiderbarCustom";
import {
  IconHome,
  IconSearch,
  IconMovie,
  IconMoodSad,
  IconHeart,
} from "@tabler/icons-react";
import DashboardService from "@/services/dasboard.service";
import { ReviewStats, StatsCount } from "@/@types/dashboard";
import { useQuery } from "@tanstack/react-query";

export default function NotFound() {
  const { data: statsCount, isLoading: loadingCount } = useQuery<StatsCount>({
    queryKey: ["dashboard", "count"],
    queryFn: () => DashboardService.count(),
  });

  const { data: reviewStatsInfo, isLoading: loadingReviews } = useQuery<
    ReviewStats[]
  >({
    queryKey: ["dashboard", "reviews"],
    queryFn: () => DashboardService.reviewAverage(),
  });

  const reviewStats = reviewStatsInfo?.reduce(
    (acc, review) => {
      acc.media += review.media;
      acc.total += review.total;
      return acc;
    },
    { media: 0, total: 0 },
  );

  return (
    <SidebarCustom>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
          {/* Ícone Animado */}
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <IconMoodSad className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
              404
            </div>
          </div>

          {/* Título Principal */}
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Oops!
          </h1>

          {/* Mensagem */}
          <div className="max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Página Não Encontrada
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              A aventura cinematográfica que você está procurando não foi
              encontrada. Parece que este filme ainda não chegou aos nossos
              cinemas!
            </p>
          </div>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href="/"
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <IconHome className="w-5 h-5" />
              Voltar para o Início
            </Link>

            <Link
              href="/"
              className="flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <IconSearch className="w-5 h-5" />
              Explorar Catálogo
            </Link>
          </div>

          {/* Stats para contexto */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-md mx-auto">
            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
              <IconMovie className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {statsCount?.movies}+
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Filmes
              </div>
            </div>

            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-sm">⭐</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {parseFloat(reviewStats?.media || 0).toFixed(1) || "0.0"}+
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Avaliação Media
              </div>
            </div>

            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
              <IconSearch className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {statsCount?.movies}+
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Pesquisas
              </div>
            </div>

            <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
              <IconHeart className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {statsCount?.favorites}+
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Favoritos
              </div>
            </div>
          </div>

          {/* Mensagem Inspiradora */}
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-200 dark:border-blue-800">
            <p className="text-slate-700 dark:text-slate-300 italic">
              "Não encontrou o que procurava? Talvez seja a hora de descobrir
              algo novo e incrível!"
            </p>
          </div>

          {/* Navegação Rápida */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              Ou explore estas seções populares:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { href: "/", label: "Início" },
                { href: "/Favorites", label: "Favoritos" },
                { href: "/Dashboard", label: "Dashboard" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarCustom>
  );
}
