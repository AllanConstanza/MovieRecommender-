"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useReviews } from "@/contexts/ReviewsContext";
import ReviewCard from "@/components/ReviewCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import AuthGateModal from "@/components/AuthGateModal";

export default function ReviewsPage() {
  const { user } = useAuth();
  const { reviews, loading, removeReview } = useReviews();
  const [showAuthGate, setShowAuthGate] = useState(!user);

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Your Reviews</h1>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 py-16 text-center">
          <p className="text-lg text-zinc-400">
            Sign in to view and manage your reviews.
          </p>
        </div>
        <AuthGateModal
          isOpen={showAuthGate}
          onClose={() => setShowAuthGate(false)}
        />
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  const sorted = [...reviews].sort(
    (a, b) => new Date(b.reviewed_at) - new Date(a.reviewed_at)
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Your Reviews</h1>
        <p className="mt-1 text-zinc-400">
          {reviews.length} {reviews.length === 1 ? "movie" : "movies"} reviewed
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 py-16 text-center">
          <p className="text-lg text-zinc-400">No reviews yet.</p>
          <p className="mt-1 text-sm text-zinc-500">
            Review movies from the recommendations page to see them here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map((review) => (
            <ReviewCard
              key={review.movieId}
              review={review}
              onDelete={removeReview}
            />
          ))}
        </div>
      )}
    </div>
  );
}
