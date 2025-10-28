"use client";
import { SidebarCustom } from "../_components/SiderbarCustom";
import { useQuery } from "@tanstack/react-query";
import DashboardService from "@/services/dasboard.service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconMovie,
  IconHeart,
  IconStar,
  IconTrendingUp,
  IconUsers,
  IconCalendar,
  IconChartBar,
} from "@tabler/icons-react";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

// Tipos para os dados
import {
  StatsCount,
  TypeCount,
  DecadeStats,
  GenreCount,
  ReviewStats,
  YearSearch,
} from "@/@types/dashboard";

// Cores para gráficos
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<"all" | "year" | "month">("all");

  const options: Record<"all" | "year" | "month", any> = {
    all: null,
    year: {
      year: new Date().getFullYear(),
    },
    month: {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    },
  };

  // Queries para dados
  const { data: statsCount, isLoading: loadingCount } = useQuery<StatsCount>({
    queryKey: ["dashboard", "count", timeRange],
    queryFn: () => DashboardService.count(options[timeRange]),
  });

  const { data: typeStats, isLoading: loadingTypes } = useQuery<TypeCount[]>({
    queryKey: ["dashboard", "types", timeRange],
    queryFn: () => DashboardService.countTypes(options[timeRange]),
  });

  const { data: genreStats, isLoading: loadingGenres } = useQuery<GenreCount[]>(
    {
      queryKey: ["dashboard", "genres", timeRange],
      queryFn: () => DashboardService.countGenres(options[timeRange]),
    },
  );

  const { data: decadeStats, isLoading: loadingDecades } = useQuery<
    DecadeStats[]
  >({
    queryKey: ["dashboard", "decades", timeRange],
    queryFn: () => DashboardService.favoritesByDecade(options[timeRange]),
  });

  const { data: reviewStatsInfo, isLoading: loadingReviews } = useQuery<
    ReviewStats[]
  >({
    queryKey: ["dashboard", "reviews", timeRange],
    queryFn: () => DashboardService.reviewAverage(options[timeRange]),
  });

  const reviewStats = reviewStatsInfo?.reduce(
    (acc, review) => {
      acc.media += review.media;
      acc.total += review.total;
      return acc;
    },
    { media: 0, total: 0 },
  );

  const { data: yearSearches, isLoading: loadingSearches } = useQuery<
    YearSearch[]
  >({
    queryKey: ["dashboard", "searches", timeRange],
    queryFn: () => DashboardService.yearSearch(options[timeRange]),
  });

  const isLoading =
    loadingCount ||
    loadingTypes ||
    loadingGenres ||
    loadingDecades ||
    loadingReviews ||
    loadingSearches;

  // Dados formatados para gráficos
  const genreChartData =
    genreStats?.slice(0, 6).map((genre) => ({
      name:
        genre.genre.length > 10
          ? genre.genre.substring(0, 10) + "..."
          : genre.genre,
      value: genre.count,
    })) || [];

  const decadeChartData =
    decadeStats?.map((decade) => ({
      name: `${decade.decade}s`,
      count: decade.count,
    })) || [];

  const typeChartData =
    typeStats?.map((type) => ({
      name: type.type,
      value: Number(type.count),
    })) || [];

  const searchTrendDataInitial =
    yearSearches
      ?.slice(0, 10)
      .sort((a, b) => Number(a.year) - Number(b.year)) || [];

  const searchTrendData =
    searchTrendDataInitial.map((search) => ({
      name: search.year,
      searches: Number(search.count),
    })) || [];

  if (isLoading) {
    return (
      <SidebarCustom>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </SidebarCustom>
    );
  }

  return (
    <SidebarCustom>
      <main className="sm:ml-14 p-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
              Dashboard Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Métricas e insights da plataforma DtiFlix
            </p>
          </div>

          {/* Filtro de Tempo */}
          <div className="flex gap-2 mt-4 lg:mt-0">
            {[
              { value: "all", label: "Todo Período" },
              { value: "year", label: "Este Ano" },
              { value: "month", label: "Este Mês" },
            ].map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value as any)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range.value
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-blue-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Métricas Principais */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-gray-800  select-none">
                  Total de Filmes
                </CardTitle>
                <IconMovie className="w-4 h-4 text-blue-500" />
              </div>
              <CardDescription>
                <span className="text-gray-800 ">
                  Filmes no catálogo
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mt-2 text-2xl font-bold  text-blue-500">
                {statsCount?.movies.toLocaleString() || 0}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-gray-800  select-none">
                  Favoritos
                </CardTitle>
                <IconHeart className="w-4 h-4 text-red-500" />
              </div>
              <CardDescription>
                <span className="text-gray-800">
                  Total de favoritados
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mt-2 text-2xl font-bold text-blue-500">
                {statsCount?.favorites?.toLocaleString() || 0}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-gray-800 select-none">
                  Média IMDb
                </CardTitle>
                <IconStar className="w-4 h-4 text-yellow-500" />
              </div>
              <CardDescription>
                <span className="text-gray-800">
                  Média de avaliações
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mt-2  text-2xl font-bold text-blue-500">
                {parseFloat(reviewStats?.media || 0).toFixed(1)  || "0.0"}/5.0
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-gray-800 select-none">
                  Total de Pesquisas
                </CardTitle>
                <IconUsers className="w-4 h-4 text-green-500" />
              </div>
              <CardDescription>
                <span className="text-gray-800 ">
                  Pesquisas Realizadas
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mt-2 text-2xl font-bold text-blue-500">
                {statsCount?.pesquisas?.toLocaleString() || "N/A"}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Gráficos Principais */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Gêneros Mais Populares */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconTrendingUp className="w-5 h-5 text-green-500 " />
                <span className="text-gray-800">
                  Gêneros Mais Populares
                </span>
              </CardTitle>
              <CardDescription>
                <span className="text-gray-800">
                  Distribuição por gênero cinematográfico
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={genreChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Distribuição por Tipo */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconChartBar className="w-5 h-5 text-purple-500" />
                <span className="text-gray-800">
                  Tipos de Conteúdo
                </span>
              </CardTitle>
              <CardDescription>
                <span className="text-gray-800">
                  Distribuição entre filmes, séries e outros
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={typeChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({
                        name,
                        percent,
                      }: {
                        name: string;
                        percent: number;
                      }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {typeChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Gráficos Secundários */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Favoritos por Década */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconCalendar className="w-5 h-5 text-orange-500" />
                <span className="text-gray-800">
                  Favoritos por Década
                </span>
              </CardTitle>
              <CardDescription>
                <span className="text-gray-800">
                  Preferências por década de lançamento
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={decadeChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Tendência de Buscas por Ano */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconChartBar className="w-5 h-5 text-blue-500" />
                <span className="text-gray-800">
                  Buscas por Ano
                </span>
              </CardTitle>
              <CardDescription>
                <span className="text-gray-800">
                  Tendência de buscas por ano de lançamento
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={searchTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="searches"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Resumo Estatístico */}
        <section className="mt-6">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle>Resumo do Período</CardTitle>
              <CardDescription className="text-blue-100">
                Visão geral das métricas principais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-blue-100 text-sm">Filmes</p>
                  <p className="text-2xl font-bold">
                    {statsCount?.movies || 0}
                  </p>
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Favoritos</p>
                  <p className="text-2xl font-bold">
                    {statsCount?.favorites || 0}
                  </p>
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Média IMDb</p>
                  <p className="text-2xl font-bold">
                    {parseFloat(reviewStats?.media || "0").toFixed(1) || "0.0"}
                  </p>
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Gêneros</p>
                  <p className="text-2xl font-bold">
                    {genreStats?.length || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </SidebarCustom>
  );
}
