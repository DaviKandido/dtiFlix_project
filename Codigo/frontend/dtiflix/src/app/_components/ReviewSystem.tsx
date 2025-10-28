"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ReviewService from "@/services/review.service";
import { Review } from "@/@types/review";
import {
  IconStar,
  IconStarFilled,
  IconMessage,
  IconEdit,
  IconTrash,
  IconSend,
  IconUser,
} from "@tabler/icons-react";
import { toast } from "sonner";

interface ReviewSystemProps {
  movieId: number;
  movieTitle: string;
}

export function ReviewSystem({ movieId, movieTitle }: ReviewSystemProps) {
  const queryClient = useQueryClient();
  const [isWriting, setIsWriting] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  // Buscar reviews do filme
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews", movieId],
    queryFn: () =>
      ReviewService.getByMovieId(movieId, {
        include: ["Movie"],
        order: [["createdAt", "DESC"]],
      }),
  });

  // Encontrar review do usuário atual (monousuário)
  const userReview = reviews?.find((review) => review.movie_id === movieId);

  // Mutation para criar/atualizar review
  const saveReviewMutation = useMutation({
    
    mutationFn: (reviewData: Omit<Review, "id">) =>
      userReview
        ? ReviewService.update(userReview.id, reviewData)
        : ReviewService.create(reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", movieId] });
      setRating(0);
      setComment("");
      setIsWriting(false);
      toast.success(
        userReview
          ? "Avaliação atualizada! ✨"
          : "Avaliação enviada com sucesso! 🌟",
      );
    },
    onError: () => {
      toast.error(`Erro ao ${userReview ? "atualizar" : "enviar"} avaliação`);
    },
  });

  // Mutation para deletar review
  const deleteReviewMutation = useMutation({
    mutationFn: (reviewId: number) => ReviewService.delete(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", movieId] });
      toast.success("Avaliação removida");
    },
    onError: () => {
      toast.error("Erro ao remover avaliação");
    },
  });

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.error("Por favor, selecione uma avaliação");
      return;
    }

    if (!comment.trim()) {
      toast.error("Por favor, escreva um comentário");
      return;
    }

    saveReviewMutation.mutate({
      movie_id: movieId,
      rating: rating,
      comment: comment.trim(),
    });
  };

  const handleDeleteReview = (reviewId: number) => {
    if (confirm("Tem certeza que deseja excluir esta avaliação?")) {
      deleteReviewMutation.mutate(reviewId);
    }
  };

  const handleEditReview = () => {
    if (userReview) {
      setRating(userReview.rating);
      setComment(userReview.comment);
      setIsWriting(true);
    }
  };

  // Estatísticas das reviews
  const averageRating = reviews?.length
    ? reviews.reduce((acc, review) => acc + parseFloat(review.rating), 0) /
      reviews.length
    : 0;

  const ratingDistribution = [1, 2, 3, 4, 5].map((star) => ({
    star,
    count:
      reviews?.filter((review) => parseFloat(review.rating) === star).length ||
      0,
    percentage: reviews?.length
      ? (reviews.filter((review) => parseFloat(review.rating) === star).length /
          reviews.length) *
        100
      : 0,
  }));

  return (
    <div className="space-y-8">
      {/* Header e Estatísticas */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <IconMessage className="w-6 h-6 text-blue-500" />
              Avaliações e Comentários
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              Suas opiniões sobre "{movieTitle}"
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="flex items-center gap-1">
                <IconStarFilled className="w-6 h-6 text-yellow-500" />
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  {averageRating.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Média geral
              </p>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {reviews?.length || 0}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Avaliações
              </p>
            </div>
          </div>
        </div>

        {/* Distribuição de Estrelas */}
        <div className="mt-6 space-y-2">
          {ratingDistribution.reverse().map(({ star, count, percentage }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="text-sm text-slate-600 dark:text-slate-300 w-4">
                {star}
              </span>
              <IconStarFilled className="w-4 h-4 text-yellow-500" />
              <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400 w-8 text-right">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Minha Avaliação (se existir) */}
      {userReview && !isWriting && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 shadow-lg border border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <IconUser className="w-5 h-5 text-blue-500" />
              Sua Avaliação
            </h4>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <IconStarFilled
                  key={star}
                  className={`w-5 h-5 ${
                    star <= parseFloat(userReview.rating)
                      ? "text-yellow-500"
                      : "text-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
            {userReview.comment}
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleEditReview}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              <IconEdit className="w-4 h-4" />
              Editar Avaliação
            </button>
            <button
              onClick={() => handleDeleteReview(userReview.id)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
            >
              <IconTrash className="w-4 h-4" />
              Excluir
            </button>
          </div>
        </div>
      )}

      {/* Botão para Escrever Review (se não tiver avaliação) */}
      {!userReview && !isWriting && (
        <button
          onClick={() => setIsWriting(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          <IconEdit className="w-5 h-5" />
          Escrever Minha Avaliação
        </button>
      )}

      {/* Formulário de Review */}
      {isWriting && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            {userReview ? "Editar Avaliação" : "Sua Avaliação"}
          </h4>

          {/* Seletor de Estrelas */}
          <div className="mb-6">
            <p className="text-slate-600 dark:text-slate-300 mb-3">
              Como você avalia este filme?
            </p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  {star <= (hoveredRating || rating) ? (
                    <IconStarFilled className="w-10 h-10 text-yellow-500" />
                  ) : (
                    <IconStar className="w-10 h-10 text-slate-300" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Campo de Comentário */}
          <div className="mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Compartilhe sua opinião sobre o filme... (mínimo 10 caracteres)"
              className="w-full h-32 p-4 border border-slate-300 dark:border-slate-600 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-red-400"
              maxLength={500}
            />
            <div className="text-right text-sm text-slate-500 mt-1">
              {comment.length}/500
            </div>
          </div>

          {/* Ações do Formulário */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                setIsWriting(false);
                setRating(0);
                setComment("");
              }}
              className="flex-1 py-3 px-6 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmitReview}
              disabled={
                saveReviewMutation.isPending ||
                rating === 0 ||
                comment.length < 10
              }
              className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {saveReviewMutation.isPending ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <IconSend className="w-5 h-5" />
                  {userReview ? "Atualizar Avaliação" : "Enviar Avaliação"}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Todas as Avaliações (histórico) */}
      {reviews && reviews.length > 0 && (
        <div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <IconMessage className="w-5 h-5 text-blue-500" />
            Todas as suas avaliações ({reviews.length})
          </h4>
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onDelete={handleDeleteReview}
                onEdit={handleEditReview}
                isUsersReview={review.id === userReview?.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Componente de Card de Review Individual
interface ReviewCardProps {
  review: Review;
  onDelete: (reviewId: number) => void;
  onEdit: () => void;
  isUsersReview: boolean;
}

function ReviewCard({
  review,
  onDelete,
  onEdit,
  isUsersReview,
}: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`rounded-2xl p-6 shadow-lg border transition-all ${
        isUsersReview
          ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700"
          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
              isUsersReview
                ? "bg-gradient-to-br from-blue-500 to-purple-600"
                : "bg-gradient-to-br from-slate-500 to-slate-600"
            }`}
          >
            <IconUser className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              {isUsersReview ? "Você" : "Avaliação"}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {review.createdAt
                ? new Date(review.createdAt).toLocaleDateString("pt-BR")
                : "Data não disponível"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <IconStarFilled
              key={star}
              className={`w-5 h-5 ${
                star <= parseFloat(review.rating)
                  ? "text-yellow-500"
                  : "text-slate-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p
          className={`text-slate-700 dark:text-slate-300 leading-relaxed ${
            !isExpanded && review.comment.length > 200 ? "line-clamp-3" : ""
          }`}
        >
          {review.comment}
        </p>

        {review.comment.length > 200 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
          >
            {isExpanded ? "Ver menos" : "Ver mais"}
          </button>
        )}
      </div>

      {/* Ações apenas para a review do usuário */}
      {isUsersReview && (
        <div className="flex justify-end gap-3">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            <IconEdit className="w-4 h-4" />
            Editar
          </button>
          <button
            onClick={() => onDelete(review.id)}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
          >
            <IconTrash className="w-4 h-4" />
            Excluir
          </button>
        </div>
      )}
    </div>
  );
}
