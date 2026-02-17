"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { addReview, getUserReviews, deleteReview } from "@/lib/firestore";

const ReviewsContext = createContext(null);

export function ReviewsProvider({ children }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getUserReviews(user.uid)
        .then(setReviews)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  async function submitReview(movie, reviewData) {
    const fullReview = {
      movieId: movie.id,
      movieTitle: movie.title,
      posterPath: movie.poster_path,
      voteAverage: movie.vote_average,
      releaseDate: movie.release_date,
      ...reviewData,
      reviewed_at: new Date().toISOString(),
    };

    // Optimistic update
    setReviews((prev) => {
      const filtered = prev.filter((r) => r.movieId !== movie.id);
      return [fullReview, ...filtered];
    });

    if (user) {
      await addReview(user.uid, movie.id, fullReview);
    }
  }

  async function removeReview(movieId) {
    setReviews((prev) => prev.filter((r) => r.movieId !== movieId));
    if (user) {
      await deleteReview(user.uid, movieId);
    }
  }

  function isReviewed(movieId) {
    return reviews.some((r) => r.movieId === movieId);
  }

  function getReview(movieId) {
    return reviews.find((r) => r.movieId === movieId) || null;
  }

  const value = {
    reviews,
    loading,
    submitReview,
    removeReview,
    isReviewed,
    getReview,
  };

  return (
    <ReviewsContext.Provider value={value}>
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error("useReviews must be used within a ReviewsProvider");
  }
  return context;
}
