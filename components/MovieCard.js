"use client";

import { useState } from "react";
import Image from "next/image";
import { getPosterUrl } from "@/lib/tmdb";
import WatchlistButton from "./WatchlistButton";
import ReviewForm from "./ReviewForm";
import { useReviews } from "@/contexts/ReviewsContext";

export default function MovieCard({ movie }) {
  const { submitReview, isReviewed, getReview } = useReviews();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const posterUrl = getPosterUrl(movie.poster_path);
  const year = movie.release_date ? movie.release_date.split("-")[0] : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "—";
  const reviewed = isReviewed(movie.id);
  const existingReview = getReview(movie.id);

  async function handleReviewSubmit(reviewData) {
    await submitReview(movie, reviewData);
    setShowReviewForm(false);
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-all hover:border-zinc-600">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-800">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-600">
            No Poster
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3">
        <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-white">
          {movie.title}
        </h3>
        <div className="mb-2 flex items-center gap-2 text-xs text-zinc-400">
          <span>{year}</span>
          <span className="text-amber-400">★ {rating}</span>
        </div>
        <p className="line-clamp-3 text-xs leading-relaxed text-zinc-500">
          {movie.overview}
        </p>

        <div className="mt-auto flex flex-wrap gap-2 pt-3">
          <WatchlistButton movie={movie} />
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              reviewed
                ? "bg-amber-600/20 text-amber-400 hover:bg-amber-600/30"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
            }`}
          >
            {reviewed ? `★ ${existingReview.rating}/5` : "Review"}
          </button>
        </div>

        {showReviewForm && (
          <ReviewForm
            movie={movie}
            existingReview={existingReview}
            onSubmit={handleReviewSubmit}
            onCancel={() => setShowReviewForm(false)}
          />
        )}
      </div>
    </div>
  );
}
