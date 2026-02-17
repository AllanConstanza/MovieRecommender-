"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useGenres } from "@/contexts/GenreContext";
import { useReviews } from "@/contexts/ReviewsContext";
import { discoverMovies, getMovieRecommendations } from "@/lib/tmdb";
import MovieGrid from "@/components/MovieGrid";
import GenreSelector from "@/components/GenreSelector";
import RecommendationToggle from "@/components/RecommendationToggle";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function RecommendationsPage() {
  const router = useRouter();
  const { selectedGenres, hasGenres, genresLoaded } = useGenres();
  const { reviews } = useReviews();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [useReviewRecs, setUseReviewRecs] = useState(false);
  const [editingGenres, setEditingGenres] = useState(false);
  const [error, setError] = useState("");

  // Redirect to home if no genres selected
  useEffect(() => {
    if (genresLoaded && !hasGenres) {
      router.push("/");
    }
  }, [genresLoaded, hasGenres, router]);

  const fetchRecommendations = useCallback(async () => {
    if (!hasGenres) return;

    setLoading(true);
    setError("");

    try {
      const genreData = await discoverMovies(selectedGenres, 1);
      let results = genreData.results;

      if (useReviewRecs && reviews.length > 0) {
        const highlyRated = reviews
          .filter((r) => r.rating >= 4)
          .slice(0, 5);

        if (highlyRated.length > 0) {
          const reviewRecs = await Promise.all(
            highlyRated.map((r) => getMovieRecommendations(r.movieId))
          );

          const allReviewRecs = reviewRecs.flat();
          const existingIds = new Set(results.map((m) => m.id));
          const reviewedIds = new Set(reviews.map((r) => r.movieId));

          const uniqueReviewRecs = allReviewRecs.filter(
            (m) => !existingIds.has(m.id) && !reviewedIds.has(m.id)
          );

          results = [...results, ...uniqueReviewRecs]
            .sort((a, b) => b.vote_average - a.vote_average)
            .slice(0, 40);
        }
      }

      setMovies(results);
      setTotalPages(genreData.total_pages);
      setPage(1);
    } catch {
      setError("Failed to load recommendations.");
    } finally {
      setLoading(false);
    }
  }, [selectedGenres, hasGenres, useReviewRecs, reviews]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  async function loadMore() {
    const nextPage = page + 1;
    setLoadingMore(true);
    try {
      const data = await discoverMovies(selectedGenres, nextPage);
      setMovies((prev) => [...prev, ...data.results]);
      setPage(nextPage);
    } catch {
      setError("Failed to load more movies.");
    } finally {
      setLoadingMore(false);
    }
  }

  if (!genresLoaded || loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-lg bg-red-500/20 p-4 text-red-300">{error}</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Recommended for You</h1>
          <p className="mt-1 text-sm text-zinc-400 sm:text-base">
            {useReviewRecs
              ? "Based on your genres and review history"
              : "Based on your selected genres"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {reviews.length > 0 && (
            <RecommendationToggle
              enabled={useReviewRecs}
              onChange={setUseReviewRecs}
            />
          )}
          <button
            onClick={() => setEditingGenres(!editingGenres)}
            className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
          >
            {editingGenres ? "Hide Genres" : "Change Genres"}
          </button>
        </div>
      </div>

      {editingGenres && (
        <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Update Your Genres</h2>
          <GenreSelector onDone={() => setEditingGenres(false)} />
        </div>
      )}

      <MovieGrid movies={movies} />

      {page < totalPages && !useReviewRecs && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="rounded-lg bg-zinc-800 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50"
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
